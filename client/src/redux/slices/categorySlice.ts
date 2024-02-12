import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Category, CategoryState } from '../../types/categoryTypes';
import { BASE_URL } from '../../api';


const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: ''
}

export const getCategories = createAsyncThunk(
    'categories',
    async () => {
        const response = await axios.get(`${BASE_URL}/categories`);
        return response.data;
    },
);

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
            state.loading = false;
            state.categories = action.payload;
        });
        builder.addCase(getCategories.rejected, (state, action) => {
            state.loading = false;
            state.categories = [];
            state.error = action.error.message || 'Hata'
        });
    },
});

export default categorySlice.reducer;
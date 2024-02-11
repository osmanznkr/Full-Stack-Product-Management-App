import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Category {
    category_id: number;
    category_name: string;
}
interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: ''
}

export const getCategories = createAsyncThunk(
    'categories',
    async () => {
        const response = await axios.get(`http://localhost:5000/api/v1/categories`);
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
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, ProductState } from '../../types/productTypes';
import { BASE_URL } from '../../api';


const initialState: ProductState = {
    product: [],
    products: [],
    loading: false,
    error: ''
}

export const getProducts = createAsyncThunk(
    'products',
    async () => {
        return await axios.get(`${BASE_URL}/products`)
            .then((response) => response.data)
    },
);

export const getProductDetail = createAsyncThunk(
    'getProductById',
    async (productId: number) => {
        return await axios.get(`${BASE_URL}/products/${productId}`)
            .then((response) => response.data)
    },
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.products = [];
            state.error = action.error.message || 'Hata'
        });
        builder.addCase(getProductDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProductDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        });
        builder.addCase(getProductDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Hata'
        });
    },
});

export default productSlice.reducer;
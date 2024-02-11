import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
    product_id: number;
    product_name: string;
    category_name: string;
    current_price: number;
    stock: number;
    past_prices?: number[];
    barcode?: string;
    created_at: string;
}

interface ProductState {
    product: Product[]
    products: Product[];
    loading: boolean;
    error: string
}

const initialState: ProductState = {
    product: [],
    products: [],
    loading: false,
    error: ''
}

export const getProducts = createAsyncThunk(
    'products',
    async () => {
        return await axios.get(`http://localhost:5000/api/v1/products`)
            .then((response) => response.data)
    },
);

export const getProductDetail = createAsyncThunk(
    'getProductById',
    async (productId: number) => {
        return await axios.get(`http://localhost:5000/api/v1/products/${productId}`)
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
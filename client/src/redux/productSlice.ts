import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    product_id: number;
    product_name: string;
    category_id: number;
    current_price: number;
    stock: number;
    past_prices?: number[];
    barcode?: string;
    created_at: string;
}

interface ProductState {
    products: Product[];
    loading: boolean;
}

const initialState: ProductState = {
    products: [],
    loading: false
}

export const getProducts = createAsyncThunk(
    'products',
    async () => {
        const response = await fetch(`http://localhost:5000/api/v1/products`);
        return (await response.json()) as Product[]; 
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
    },
});

export default productSlice.reducer;
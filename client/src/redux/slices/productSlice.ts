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

export const updateProductById = createAsyncThunk(
    'updateProductById',
    async (payload: { productId: number, updatedProductData: Partial<Product> }) => {
        const { productId, updatedProductData } = payload;
        try {
            await axios.put(`${BASE_URL}/products/update/${productId}`, updatedProductData);
            return productId; // Başarılı güncelleme durumunda, güncellenen ürünün ID'sini döndürüyoruz
        } catch (error) {
            throw Error('Ürün güncellenirken bir hata oluştu.'); // Hata durumunda istisna fırlatıyoruz
        }
    },
);

export const deleteProductById = createAsyncThunk(
    'deleteProductById',
    async (productId: number) => {
        try {
            await axios.delete(`${BASE_URL}/products/delete/${productId}`);
            return productId; // Başarılı silme durumunda, silinen ürünün ID'sini döndürüyoruz
        } catch (error) {
            throw Error('Ürün silinirken bir hata oluştu.'); // Hata durumunda istisna fırlatıyoruz
        }
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
        builder.addCase(updateProductById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateProductById.fulfilled, (state, action: PayloadAction<number>) => {
            state.loading = false;
            console.log('Ürün başarıyla güncellendi. Güncellenen ürün ID:', action.payload);
        });
        builder.addCase(updateProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Hata'
        });
        builder.addCase(deleteProductById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteProductById.fulfilled, (state, action: PayloadAction<number>) => {
            state.loading = false;
            console.log('Ürün başarıyla silindi. Silinen ürün ID:', action.payload);
        });
        builder.addCase(deleteProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Hata'
        });
        
    },
});

export default productSlice.reducer;
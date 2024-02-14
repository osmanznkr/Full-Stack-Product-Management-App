import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { NewProduct, Product, ProductState } from '../../types/productTypes';
import { BASE_URL } from '../../api';
import axiosInstance from '../../api/axiosInstance';


const initialState: ProductState = {
    product: [],
    products: [],
    loading: false,
    error: ''
}

export const getProducts = createAsyncThunk(
    'products',
    async () => {
        return await axiosInstance.get(`${BASE_URL}/products`)
            .then((response) => response.data)
    },
);

export const getProductDetail = createAsyncThunk(
    'getProductById',
    async (productId: number) => {
        return await axiosInstance.get(`${BASE_URL}/products/${productId}`)
            .then((response) => response.data)
    },
);

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (newProduct: NewProduct) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/products/create`, newProduct);
            return response.data; // Sunucudan dönen yanıtı payload olarak döndür
        } catch (error) {
            throw Error('Ürün eklenirken bir hata oluştu.');
        }
    },
);

export const updateProductById = createAsyncThunk(
    'products/updateProductById',
    async (payload: { productId: number, updatedProductData: Partial<Product> }) => {
        const { productId, updatedProductData } = payload;
        try {
            await axiosInstance.put(`${BASE_URL}/products/update/${productId}`, updatedProductData);
            return { productId, updatedProductData }; // Başarılı güncelleme durumunda, güncellenen ürünün ID'sini ve güncellenen verileri döndürüyoruz
        } catch (error) {
            throw Error('Ürün güncellenirken bir hata oluştu.'); // Hata durumunda istisna fırlatıyoruz
        }
    },
);

export const deleteProductById = createAsyncThunk(
    'deleteProductById',
    async (productId: number) => {
        try {
            await axiosInstance.delete(`${BASE_URL}/products/delete/${productId}`);
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
        builder.addCase(addProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload);
            console.log('Yeni ürün başarıyla eklendi.');
            alert('Yeni ürün başarıyla eklendi')
        });
        builder.addCase(addProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Hata';
        });
        builder.addCase(updateProductById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateProductById.fulfilled, (state, action: PayloadAction<{ productId: number, updatedProductData: Partial<Product> }>) => {
            state.loading = false;
            console.log('Ürün başarıyla güncellendi. Güncellenen ürün ID:', action.payload.productId);
            alert('Ürün güncellendi')
            // Güncellenen ürünü state'deki products array'inde güncelleme
            state.products = state.products.map(product => {
                if (product.product_id === action.payload.productId) {
                    return { ...product, ...action.payload.updatedProductData };
                }
                return product;
            });
        });
        builder.addCase(updateProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Hata'
        });
        builder.addCase(deleteProductById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteProductById.fulfilled, (state, action) => {
            state.loading = false;
            // Silinen ürünü state'deki products array'inden kaldırma
            state.products = state.products.filter(product => product.product_id !== action.payload);
            console.log('Ürün başarıyla silindi. Silinen ürün ID:', action.payload);
            alert('Ürün silme başarılı')
        });
        builder.addCase(deleteProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Hata'
        });
        
    },
});

export default productSlice.reducer;
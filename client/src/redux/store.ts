import { configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/productSlice'
import categorySlice from './slices/categorySlice';
import dialogSlice from './slices/dialogSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
    reducer: {
        products: productSlice,
        categories: categorySlice,
        dialog: dialogSlice,
        auth: authSlice
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
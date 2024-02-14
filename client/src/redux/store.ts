import { configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/productSlice'
import categorySlice from './slices/categorySlice';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import generalSlice from './slices/generalSlice';

export const store = configureStore({
    reducer: {
        products: productSlice,
        categories: categorySlice,
        general: generalSlice,
        auth: authSlice,
        users: userSlice
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
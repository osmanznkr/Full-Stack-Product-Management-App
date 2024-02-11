import { configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/productSlice'
import categorySlice from './slices/categorySlice';
import dialogSlice from './slices/dialogSlice';

export const store = configureStore({
    reducer: {
        products: productSlice,
        categories: categorySlice,
        dialog: dialogSlice
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { configureStore } from "@reduxjs/toolkit";
import Slice from './Slices/Slice';

export const store = configureStore({ 
    reducer: {
        cart: Slice,
    },
});

export default store;

// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./cartSlice"
import merchCartReducer from "./merchCartSlice"; // ✅ import merch cart slice
import uiReducer from "./uiSlice"


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    merchCart: merchCartReducer, // merch cart
    ui: uiReducer,

  },
});

// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./redux/wishlistSlice";
import cartReducer from "./redux/cartSlice"; // if needed

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer, // Add cart reducer similarly if needed
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalPrice: 0,
};

const calculateTotalPrice = (cart) =>
  cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

export const Slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddCart: (state, action) => {
      const itemToAdd = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.name === itemToAdd.name && item.size === itemToAdd.size
      );

      if (existingItemIndex >= 0) {
        state.cart[existingItemIndex].quantity += itemToAdd.quantity;
      } else {
        state.cart.push(itemToAdd);
      }
      
      state.totalPrice = calculateTotalPrice(state.cart);
    },
    RemoveCart: (state, action) => {
      const itemToRemove = action.payload;
      state.cart = state.cart.filter(
        (item) =>
          !(item.name === itemToRemove.name && item.size === itemToRemove.size)
      );
      state.totalPrice = calculateTotalPrice(state.cart);
    },
    ClearCart: (state) => {
      state.cart = [];
      state.totalPrice = 0; 
    },
  },
});

export const { AddCart, RemoveCart, ClearCart } = Slice.actions;
export default Slice.reducer;

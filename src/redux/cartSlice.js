import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage on first run
const savedCart = localStorage.getItem('cartItems');
const initialState = {
  isOpen: false,
  items: savedCart ? JSON.parse(savedCart) : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(
        item => item.id === product.id && item.packSize === product.packSize
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          name: product.productName,
          price: product.price,
          quantity: 1,
          productImage: product.productImage,
          currency: product.currency,
          packSize: product.packSize,
        });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(i => i.id !== action.payload);
        }
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const {
  toggleCart,
  addToCart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

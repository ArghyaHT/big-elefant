// merchCartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load merch cart from localStorage
const savedMerchCart = localStorage.getItem('merchCartItems');

const initialState = {
  isOpen: false,
  items: savedMerchCart ? JSON.parse(savedMerchCart) : [],
};

const merchCartSlice = createSlice({
  name: 'merchCart',
  initialState,
  reducers: {
    // toggleMerchCart: (state) => {
    //   state.isOpen = !state.isOpen;
    // },

    addMerchToCart: (state, action) => {
      const merch = action.payload;
      const existingItem = state.items.find(
        item => item.id === merch.id && item.size === merch.size && item.color === merch.color
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: merch.id,
          name: merch.name,
          price: merch.price,
          productImage: merch.productImage,
          currency: merch.currency,
          size: merch.size || null,
          color: merch.color || null,
          quantity: 1,
          type: "merch"
        });
      }

      localStorage.setItem('merchCartItems', JSON.stringify(state.items));
    },

    removeMerchFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('merchCartItems', JSON.stringify(state.items));
    },

    increaseMerchQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem('merchCartItems', JSON.stringify(state.items));
      }
    },

    decreaseMerchQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(i => i.id !== action.payload);
        }
        localStorage.setItem('merchCartItems', JSON.stringify(state.items));
      }
    },

    clearMerchCart: (state) => {
      state.items = [];
      localStorage.removeItem('merchCartItems');
    },
  },
});

export const {
  // toggleMerchCart,
  addMerchToCart,
  removeMerchFromCart,
  increaseMerchQuantity,
  decreaseMerchQuantity,
  clearMerchCart,
} = merchCartSlice.actions;

export default merchCartSlice.reducer;

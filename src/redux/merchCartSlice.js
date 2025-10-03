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

      // check by _id + size + color (to distinguish different selections)
      const existingItem = state.items.find(
        item =>
          item.id === merch._id &&
          item.selectedSize === merch.selectedSize &&
          item.selectedColor === merch.selectedColor
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...merch,
          id: `${merch._id}-${merch.selectedSize}-${merch.selectedColor}`, // unique cart ID             
          quantity: 1,                       // add cart-specific field
          type: "merch",                     // so you can differentiate in UI
          productImage: merch.merchImages?.[0] || merch.merchImage, // fallback
          name: merch.merchName,             // convenience for display
          price: merch.variants
            ?.flatMap(v => v.clothSizes || [])
            .find(s => s.sizeName === merch.selectedSize)?.price || 0,
          size: merch.selectedSize,
          color: merch.selectedColor,
        });
      }

      localStorage.setItem("merchCartItems", JSON.stringify(state.items));
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

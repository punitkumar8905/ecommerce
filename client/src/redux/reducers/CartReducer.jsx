import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  //  {id,  name, price, original_price , quantity}
  totalPrice: 0,
  totalOriginalPrice: 0,
};

const calculateTotals = (items) => ({
  totalPrice: items.reduce((sum, item) => sum + item.quantity * item.price, 0),
  totalOriginalPrice: items.reduce((sum, item) => sum + item.quantity * item.original_price, 0),
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const itemFound = state.items.find((cartItem) => cartItem.id == item.id);
      // const existingItem = state.items.find((cartItem) => cartItem.id === item.id);

      if (itemFound) {
        // itemFound.quantity += item.quantity || 1;
        itemFound.quantity++;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      const totals = calculateTotals(state.items);
      state.totalPrice = totals.totalPrice;
      state.totalOriginalPrice = totals.totalOriginalPrice;
      localStorage.setItem("cart", JSON.stringify(state))
    },

    // updateQuantity: (state, action) => {
    //   const { id, original_price, price, flag } = action.payload;
    //   //  flag=0 for increase, flag=1 for decrease
    //   const item = state.items.find((item) => item.id === id);

    //   if (flag == "0") {
    //     item.quantity++;
    //     state.totalPrice += price;
    //     state.totalOriginalPrice += original_price; 
    //   }else{

    //       item.quantity--;
    //       state.totalPrice -= price;
    //       state.totalOriginalPrice -= original_price

    //   }
    //   localStorage.setItem("cart", JSON.stringify(state));

    //   item.quantity = Math.max(0, item.quantity + (flag === 1 ? 1 : -1));

    //   if (item.quantity === 0) {
    //     state.items = state.items.filter((cartItem) => cartItem.id !== id);
    //   }

    //   const totals = calculateTotals(state.items);
    //   state.totalPrice = totals.totalPrice;
    //   state.totalOriginalPrice = totals.totalOriginalPrice;
    // },

    updateQuantity: (state, action) => {
      const { id, flag } = action.payload;

      const item = state.items.find(
        (cartItem) => cartItem.id === id
      );

      if (!item) return;

      // flag = 0 -> increase
      // flag = 1 -> decrease

      if (Number(flag) === 0) {
        item.quantity += 1;
      } else {
        item.quantity -= 1;
      }

      // Quantity 0 hone par product remove
      if (item.quantity <= 0) {
        state.items = state.items.filter(
          (cartItem) => cartItem.id !== id
        );
      }

      // Recalculate complete cart totals
      const totals = calculateTotals(state.items);

      state.totalPrice = totals.totalPrice;
      state.totalOriginalPrice = totals.totalOriginalPrice;

      // Save FINAL updated state
      localStorage.setItem(
        "cart",
        JSON.stringify(state)
      );
    },


    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalOriginalPrice = 0;
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
    },

    lsToCart: (state) => {
      if (typeof window === "undefined") return;
      const lsCart = localStorage.getItem("cart")
      if (lsCart) {
        try {
          const cart = JSON.parse(lsCart);
          state.items = cart.items || [];
          const totals = calculateTotals(state.items);
          state.totalPrice = totals.totalPrice;
          state.totalOriginalPrice = totals.totalOriginalPrice;
        } catch (error) {
          localStorage.removeItem("cart");
          state.items = [];
          state.totalPrice = 0;
          state.totalOriginalPrice = 0;
        }
      }
    },

    syncCart: (state, action) => {
      const { items = [], totalPrice = 0, totalOriginalPrice = 0 } = action.payload || {};
      state.items = items;
      state.totalPrice = totalPrice;
      state.totalOriginalPrice = totalOriginalPrice;
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, lsToCart, syncCart } = cartSlice.actions;

export default cartSlice.reducer;

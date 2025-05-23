import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Flight } from "../../types/flight";
import type { RootState } from "../../app/store";
import type { Seat } from "../../types/seat";

interface CartItem {
  flight: Flight;
  seats: Seat[];
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { flight, seats } = action.payload;

      const existingItem = state.cart.find(item => item.flight.id === flight.id);

      if (existingItem) {
        const existingSeatIds = new Set(existingItem.seats.map(seat => seat.id));
        const newSeats = seats.filter(seat => !existingSeatIds.has(seat.id));

        existingItem.seats.push(...newSeats);
      } else {
        state.cart.push({ flight, seats });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ flightId: string; seatId: string }>) => {
      const { flightId, seatId } = action.payload;

      const cartItem = state.cart.find(item => item.flight.id === flightId);

      if (cartItem) {
        cartItem.seats = cartItem.seats.filter(seat => seat.id !== seatId);

        if (cartItem.seats.length === 0) {
          state.cart = state.cart.filter(item => item.flight.id !== flightId);
        }
      }
    },
    resetCart: (state) => {
      state.cart = [];
    }
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.cart;
export default cartSlice.reducer;

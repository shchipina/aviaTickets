import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Flight } from "../../types/flight";
import type { RootState } from "../../app/store";

interface FavoritesState {
  favorites: Flight[];
}

const initialState: FavoritesState = {
  favorites: []
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Flight>) => {
      const exists = state.favorites.find(item => item.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(item => item.id !== action.payload);
    },
    clearFavorites: (state) => {
      state.favorites = [];
    }
  }
});

export const {
  addToFavorites,
  removeFromFavorites,
  clearFavorites
} = favoritesSlice.actions;
export const selectFavorites = (state: RootState) => state.favorites.favorites;
export default favoritesSlice.reducer;

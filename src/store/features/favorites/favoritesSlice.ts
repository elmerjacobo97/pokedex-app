import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SimplePokemon} from '../../../interfaces';

interface FavoritesState {
  favorites: SimplePokemon[];
}

const initialState: FavoritesState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<SimplePokemon>) => {
      const pokemon = action.payload;
      state.favorites.push(pokemon);
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      const pokemonId = action.payload;
      state.favorites = state.favorites.filter(poke => poke.id !== pokemonId);
    },
  },
});

export const {addToFavorites, removeFromFavorites} = favoritesSlice.actions;

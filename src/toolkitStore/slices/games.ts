import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newGame: {
    name: null,
    price: null,
    count: 0,
    disk: false,
    digital: false,
    popularity: 0,
    image: '',
    description: '',
    isNew: false,
    isPreview: false,
    preview: '',
    genreId: 0,
    genre: {
      id: 0,
      name: '',
    },
    authorId: 0,
    author: {
      id: 0,
      name: '',
    },
  },
  isLoading: false,
  gameError: '',
};

export const gamesSlice = createSlice({
  name: 'gamesReducer',
  initialState,
  reducers: {
    addNewGameRequest: (state, { payload }) => {
      state.isLoading = true;
      state.newGame = payload;
    },
    addNewGameSaveOptionts: (state, { payload }) => {
      const newGame = { ...payload };
      state.newGame = newGame;
    },
    addNewGameSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.newGame = payload;
      state.gameError = '';
    },
    addNewGameFailure: (state, { payload }) => {
      state.isLoading = false;
      state.gameError = payload;
    },
    resetGame: (state) => {
      state.newGame = initialState.newGame;
    },
  },
});

export default gamesSlice.reducer;

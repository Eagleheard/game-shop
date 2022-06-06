import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newAuthor: {
    name: '',
    image: '',
    location: '',
    description: '',
    popularity: 0,
  },
  isLoading: false,
  authorError: '',
};

export const authorsSlice = createSlice({
  name: 'authorsReducer',
  initialState,
  reducers: {
    addNewAuthorRequest: (state, { payload }) => {
      state.isLoading = true;
      state.newAuthor = payload;
    },
    addNewAuthorSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.newAuthor = payload;
      state.authorError = '';
    },
    addNewAuthorFailure: (state, { payload }) => {
      state.isLoading = false;
      state.authorError = payload;
    },
  },
});

export default authorsSlice.reducer;
export const { addNewAuthorRequest, addNewAuthorSuccess, addNewAuthorFailure } =
  authorsSlice.actions;

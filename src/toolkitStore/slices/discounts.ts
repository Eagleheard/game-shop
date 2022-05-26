import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  discount: [
    {
      startDiscount: '',
      endDiscount: '',
      gameName: '',
    },
  ],
  isLoading: false,
  discountError: '',
};

export const discountsSlice = createSlice({
  name: 'discountsReducer',
  initialState,
  reducers: {
    addDiscountsRequest: (state, { payload }) => {
      state.isLoading = true;
      state.discount = payload;
    },
    addDiscountsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.discount = payload;
      state.discountError = '';
    },
    addDiscountsFailure: (state, { payload }) => {
      state.isLoading = false;
      state.discountError = payload;
    },
  },
});

export default discountsSlice.reducer;

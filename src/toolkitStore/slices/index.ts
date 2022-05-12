import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [
    {
      id: 0,
      name: '',
      email: '',
      address: '',
      zipCode: '',
      quantity: 0,
      comment: '',
      formatedCreatedAt: '',
      formatedUpdatedAt: '',
      game: {
        id: 0,
        name: '',
        price: 0,
        image: '',
        disk: false,
        digital: false,
      },
    },
  ],
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
  newAuthor: {
    name: '',
    image: '',
    location: '',
    description: '',
    popularity: 0,
  },
  discount: [
    {
      startDiscount: '',
      endDiscount: '',
      gameName: '',
    },
  ],
  users: [
    {
      id: 0,
      name: '',
      lastName: '',
      email: '',
      photo: '',
      blocked: false,
    },
  ],
  isLoading: false,
  error: '',
};

const adminPanelSlice = createSlice({
  name: 'adminPanelReducer',
  initialState,
  reducers: {
    getOrdersRequest: (state) => {
      state.isLoading = true;
    },
    getOrdersSuccess: (state, { payload }) => {
      state.orders = payload;
      state.isLoading = false;
    },
    getOrdersFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    getUsersRequest: (state) => {
      state.isLoading = true;
    },
    getUsersSuccess: (state, { payload }) => {
      state.users = payload;
      state.isLoading = false;
    },
    getUsersFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    blockUserRequest: (state) => {
      state.isLoading = true;
    },
    blockUserSuccess: (state, { payload }) => {
      state.users
        .filter((user) => user.id === payload.id)
        .map((user) => user.blocked === payload.blocked);
      state.isLoading = false;
    },
    blockUserFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    addNewGameRequest: (state, { payload }) => {
      state.isLoading = true;
      state.newGame = payload;
    },
    addNewGameSaveOptionts: (state, { payload }) => {
      state.newGame.name = payload?.name;
      state.newGame.price = payload?.price;
      state.newGame.description = payload?.description;
      state.newGame.image = payload?.image;
      state.newGame.preview = payload?.preview;
      state.newGame.digital = payload?.digital;
      state.newGame.disk = payload?.disk;
      state.newGame.count = payload?.count;
      state.newGame.genre.name = payload?.genreName;
      state.newGame.author.name = payload?.authorName;
      state.newGame.isNew = payload?.isNew;
      state.newGame.isPreview = payload?.isPreview;
      state.newGame.popularity = payload?.popularity;
    },
    addNewGameSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.newGame = payload;
    },
    addNewGameFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    resetGame: (state) => {
      state.newGame = initialState.newGame;
    },
    addNewAuthorRequest: (state, { payload }) => {
      state.isLoading = true;
      state.newAuthor = payload;
    },
    addNewAuthorSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.newAuthor = payload;
    },
    addNewAuthorFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    addDiscountsRequest: (state, { payload }) => {
      state.isLoading = true;
      state.discount = payload;
    },
    addDiscountsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.discount = payload;
    },
    addDiscountsFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export default adminPanelSlice.reducer;
export const {
  getOrdersRequest,
  getOrdersSuccess,
  getOrdersFailure,
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  blockUserRequest,
  blockUserSuccess,
  blockUserFailure,
  addNewGameRequest,
  addNewGameSuccess,
  addNewGameFailure,
  addNewGameSaveOptionts,
  resetGame,
  addNewAuthorRequest,
  addNewAuthorSuccess,
  addNewAuthorFailure,
  addDiscountsRequest,
  addDiscountsSuccess,
  addDiscountsFailure,
} = adminPanelSlice.actions;

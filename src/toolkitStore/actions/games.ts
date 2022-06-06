import { gamesSlice } from 'toolkitStore/slices/games';

export const {
  addNewGameRequest,
  addNewGameSuccess,
  addNewGameFailure,
  addNewGameSaveOptionts,
  resetGame,
} = gamesSlice.actions;

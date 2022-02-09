import axios from 'axios';

import { IGame } from 'types/interfaces';

export const fetchPreviewGames = async (): Promise<IGame[]> => {
  try {
    const { data } = await axios.get('./store.json');
    return data.filter((game: IGame) => game.isPreview);
  } catch (err) {
    throw err;
  }
};

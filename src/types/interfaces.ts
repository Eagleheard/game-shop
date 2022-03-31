export interface IGame {
  id?: number;
  name: string;
  genre: {
    name: string;
    id: number;
  };
  author: {
    name: string;
    id: number;
  };
  price: number;
  image?: string;
  preview?: string;
  isPreview?: boolean;
  new?: boolean;
  popularity: number;
  description?: string;
}

export interface IAuthor {
  id: number;
  name?: string;
  location?: string;
  popularity?: number;
  description?: string;
  logo?: string;
}

export interface IParams {
  authorName?: string;
  genreName?: string;
  digital?: boolean;
  disk?: boolean;
  minPrice: string;
  maxPrice: string;
  count?: number;
  isNew?: boolean;
  order?: string;
}

export interface ICart {
  items: {
    quantity: number;
    game: IGame;
  }[];
}

export interface ISign {
  handleSwitch: () => void;
}

export interface IUser {
  email?: string;
  name?: string;
  lastname?: string;
  password?: string;
}

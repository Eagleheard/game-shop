export interface IGame {
  id: number;
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
  purchaseDate?: string;
  quantity?: number;
  disk?: boolean;
  count: string;
  cart?: boolean;
  order?: boolean;
  discount: {
    discountCount: string;
  };
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
}

export interface ICart {
  cart: {};
  game: IGame;
  quantity: number;
}

export interface ISign {
  handleSwitch: () => void;
}

export interface IUser {
  email?: string;
  name?: string;
  lastName?: string;
  password?: string;
  photo?: string;
  role?: string;
}

export interface IAchievement {
  id?: number;
  isAchieved?: boolean;
  name: string;
  description: string;
  discount: number;
  achievementId: number;
  achievement: {
    id: number;
    name: string;
    description: string;
    discount: number;
  };
}

export interface IOrder {
  id?: number;
  name?: string;
  email?: string;
  quantity?: string;
  game?: IGame;
  formatedCreatedAt?: string;
}

export interface IOrderParams {
  order?: string;
}

export interface INewGameParams {
  id?: number;
  name?: string;
  price?: string;
  count?: string;
  image?: string;
  authorName?: string;
  genreName?: string;
  disk?: boolean;
  digital?: boolean;
  popularity?: string;
  isPreview?: boolean;
  preview?: string;
  isNew?: boolean;
  description?: string;
}

export interface INewAuthorParams {
  name?: string;
  image?: string;
  description?: string;
  popularity?: string;
  location?: string;
}

export interface IDiscountParams {
  startDiscount?: string;
  endDiscount?: string;
  gameName?: string;
}

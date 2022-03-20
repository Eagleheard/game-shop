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
  price: string;
  image: string;
  preview: string;
  isPreview: boolean;
  new: boolean;
  popularity: number;
}

export interface IAuthor {
  id: number;
  name: string;
  location: string;
  popularity: number;
  description: string;
  image: string;
}

export interface IParams {
  authorName?: string;
  genreName?: string;
  digital?: boolean;
  disk?: boolean;
  minPrice?: string;
  maxPrice?: string;
  count?: number;
  isNew?: boolean;
  order?: string;
}

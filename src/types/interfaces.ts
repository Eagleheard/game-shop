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

export interface ISign {
  handleSwitch: () => void;
}

export interface IGame {
  id: number;
  name: string;
  genre: string;
  author: string;
  price: string;
  logo: string;
  preview: string;
  isPreview: boolean;
  new: boolean;
  popularity: number;
}

export interface IAuthor {
  id: number;
  name: string;
  description: string;
  logo: string;
}

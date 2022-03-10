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
  price: string;
  image: string;
<<<<<<< HEAD
  preview?: string;
  isPreview?: boolean;
  new?: boolean;
=======
  preview: string;
  isPreview: boolean;
  new: boolean;
>>>>>>> master
  popularity: number;
  description?: string;
}

export interface IAuthor {
  id: number;
  name: string;
  location: string;
  popularity: number;
  description: string;
  image: string;
}

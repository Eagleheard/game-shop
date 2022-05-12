export interface AdminPanelState {
  adminPanelReducer: {
    orders: {
      id: number;
      name: string;
      email: string;
      address: string;
      zipCode: string;
      quantity: number;
      comment: string;
      formatedCreatedAt: string;
      formatedUpdatedAt: string;
      game: {
        name: string;
        price: string;
        image: string;
        disk: boolean;
        author: {
          name: string;
        };
        genre: {
          name: string;
        };
      };
    }[];
    newGame: {
      id?: number;
      name?: string;
      price?: number;
      image?: string;
      disk?: boolean;
      digital?: boolean;
      description?: string;
      isNew?: boolean;
      isPreview?: boolean;
      preview?: string;
      count?: string;
      popularity?: string;
      authorName?: string;
      genreName?: string;
      author: {
        id: number;
        name: string;
      };
      genre: {
        id: number;
        name: string;
      };
    };
    users: {
      id: string;
      name: string;
      lastName: string;
      photo: string;
      email: string;
      blocked: boolean;
    }[];
    isLoading?: boolean;
  };
}

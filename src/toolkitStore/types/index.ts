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
    error?: string;
    gameError?: string;
    authorError?: string;
    discountError?: string;
    ordersError?: string;
    usersError?: string;
  };
}

export interface OrdersReducerState {
  ordersReducer: {
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
    isLoading: boolean;
    ordersError: string;
  };
}

export interface UsersReducerState {
  usersReducer: {
    users: {
      id: string;
      name: string;
      lastName: string;
      photo: string;
      email: string;
      blocked: boolean;
    }[];
    isLoading: boolean;
    usersError: string;
  };
}

export interface GamesReducerState {
  gamesReducer: {
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
    isLoading: boolean;
    gameError: string;
  };
}

export interface AuthorsReducerState {
  authorsReducer: {
    authorError: string;
    isLoading: boolean;
  };
}

export interface DiscountsReducerState {
  discountReducer: {
    discountError: string;
    isLoading: boolean;
  };
}

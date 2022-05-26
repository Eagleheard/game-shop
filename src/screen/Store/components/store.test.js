import { render, screen, fireEvent, waitFor, rerender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'store';
import { ToastProvider } from 'hooks/useToast';
import ErrorBoundary from 'components/ErrorBoundary';
import { AuthProvider } from 'hooks/useAuth';
import { Store } from '.';
import { fetchGames } from 'api/fetchGames';
import { fetchGenres } from 'api/fetchGenres';

const renderComponent = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <AuthProvider>
            <ToastProvider>
              <Store />
            </ToastProvider>
          </AuthProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>,
  );

const games = {
  data: {
    count: 1,
    rows: [
      {
        id: 1,
        name: 'Teamfight Tactics',
        price: 0,
        digital: true,
        disk: false,
        count: null,
        popularity: 77,
        image: 'https://res.cloudinary.com/game-shop/image/upload/v1646244501/tft_dmqgbx.jpg',
        isNew: true,
        isPreview: null,
        preview:
          'https://res.cloudinary.com/game-shop/image/upload/v1647096840/teamfight-tactics-champion-synergies-guide-800x400_he718b.jpg',
        description:
          'Teamfight Tactics (TFT) is an auto battler game developed and published by Riot Games. The game is a spinoff of League of Legends and is based on Dota Auto Chess, where players compete online against seven other opponents by building a team to be the last one standing.',
        genreId: 4,
        authorId: 6,
        discountId: null,
        genre: {
          id: 4,
          name: 'Strategy',
        },
        author: {
          id: 6,
          name: 'Riot Games',
          image: 'https://res.cloudinary.com/game-shop/image/upload/v1646320595/riot_gawusz.png',
          location: 'Los Angeles, US',
          description:
            'Riot Games, Inc. is an American video game developer, publisher and esports tournament organizer. Its headquarters are in West Los Angeles, California.',
          popularity: 85,
        },
        discount: null,
      },
      {
        id: 2,
        name: 'The last of us: Part 1',
        price: 50,
        digital: false,
        disk: true,
        count: 100,
        popularity: 89,
        image:
          'https://res.cloudinary.com/game-shop/image/upload/v1646244760/The_Last_of_Us_Cover_wujlor.jpg',
        isNew: null,
        isPreview: true,
        preview:
          'https://res.cloudinary.com/game-shop/image/upload/v1646247573/10a035ad773ee214_1920xH_bp8qab.jpg',
        description:
          'The Last of Us is a 2013 action-adventure game developed by Naughty Dog and published by Sony Computer Entertainment. Players control Joel, a smuggler tasked with escorting a teenage girl, Ellie, across a post-apocalyptic United States.',
        genreId: 1,
        authorId: 4,
        discountId: null,
        genre: {
          id: 1,
          name: 'Action',
        },
        author: {
          id: 4,
          name: 'Naughty Dogs',
          image:
            'https://res.cloudinary.com/game-shop/image/upload/v1646320511/image1-22_xpvypb.jpg',
          location: 'Santa Monica, California, US',
          description:
            'Naughty Dog, LLC (formerly JAM Software, Inc.) is an American first-party video game developer based in Santa Monica, California. Founded by Andy Gavin and Jason Rubin in 1984.',
          popularity: 89,
        },
        discount: null,
      },
    ],
  },
};

const genres = [
  {
    id: 1,
    name: 'Action',
  },
  {
    id: 2,
    name: 'Adventure',
  },
  {
    id: 3,
    name: 'RPG',
  },
  {
    id: 4,
    name: 'Strategy',
  },
  {
    id: 5,
    name: 'Racing',
  },
];

jest.mock('api/fetchGames');
jest.mock('api/fetchGenres');

describe('Store', () => {
  it('Should render store', async () => {
    fetchGames.mockResolvedValueOnce({ ...games });
    fetchGames.mockResolvedValueOnce({ ...games });
    fetchGenres.mockResolvedValueOnce({ data: genres });
    renderComponent();
    expect(await screen.findByText('Teamfight Tactics')).toBeVisible();
    expect(await screen.findByText('The last of us: Part 1')).toBeVisible();
    const input = screen.getByTestId('autocomplete');
    const submit = screen.getByTestId('search');
    fireEvent.change(input, { target: { value: 'Riot' } });
    expect(screen.getByTestId('suggest')).toHaveTextContent('Riot Games');
    fireEvent.click(screen.getByTestId('suggest'));
    fireEvent.change(input, { target: { value: 'Riot Games' } });
    expect(screen.getByTestId('autocomplete')).toHaveValue('Riot Games');
    fireEvent.click(submit);
    fetchGames.mockResolvedValueOnce({ ...games });
    expect(await screen.findByText('Teamfight Tactics')).toBeVisible();
  });
});

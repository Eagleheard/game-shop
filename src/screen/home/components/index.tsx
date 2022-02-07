import React, { useState, useEffect } from 'react';
import { fetchGames } from 'api/fetchGames';
import { fetchNewGames } from 'api/fetchNewGames';
import { fetchPopularGames } from 'api/fetchPopularGames';

import { Game } from 'screen';
import { Pagination, Select, Preview } from 'components';
import { IGame } from 'types/interfaces';

import './style.scss';

const DATA_LIMIT = 4;
enum constants {
  OUR_GAMES = 'Our games',
  NEW_GAMES = 'New games',
  POPULAR_GAMES = 'Popular games',
}

export const Home = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fillGames = async () => {
    const data = await fetchGames();
    setGames(data);
  };

  const setNewGames = async () => {
    const newGames = await fetchNewGames();
    setGames(newGames);
  };

  const setPopularGames = async () => {
    const popularGames = await fetchPopularGames();
    setGames(popularGames);
  };

  const handleSelect = (value: string) => {
    switch (value) {
      case constants.OUR_GAMES:
        fillGames();
        break;
      case constants.NEW_GAMES:
        setNewGames();
        break;
      case constants.POPULAR_GAMES:
        setPopularGames();
        break;
      default:
        fillGames();
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fillGames();
    setIsLoading(false);
  }, []);

  return (
    <div className="home">
      <div className="home__container">
        <Preview />
        <Select
          placeholder={'Our games'}
          options={[
            { id: 0, label: 'New games', value: 'New games' },
            { id: 1, label: 'Popular games', value: 'Popular games' },
          ]}
          style="home"
          handleSelect={handleSelect}
        />
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <Pagination gameData={games} RenderComponent={Game} dataLimit={DATA_LIMIT} />
        )}
      </div>
    </div>
  );
};

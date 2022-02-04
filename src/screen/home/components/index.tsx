import React, { useState, useEffect } from 'react';
import { fetchGames } from 'api/fetchGames';
import { fetchNewGames } from 'api/fetchNewGames';
import { fetchPopularGames } from 'api/fetchPopularGames';

import { Game, Pagination, Select, Preview } from 'screen';
import { IGame } from 'types/interfaces';

import './style.scss';

const DATA_LIMIT = 3;

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

  useEffect(() => {
    setIsLoading(true);
    fillGames();
    setIsLoading(false);
  }, []);

  return (
    <div className="home">
      <Preview />
      <Select
        placeholder={'Our games'}
        options={[
          { id: 0, label: 'New games', value: 'New games' },
          { id: 0, label: 'Popular games', value: 'Popular games' },
        ]}
        setNewGames={setNewGames}
        setPopularGames={setPopularGames}
        fillGames={fillGames}
      />
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Pagination gameData={games} RenderComponent={Game} dataLimit={DATA_LIMIT} />
      )}
    </div>
  );
};

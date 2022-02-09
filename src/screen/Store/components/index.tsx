import React, { useState, useEffect } from 'react';
import { fetchGames } from 'api/fetchGames';

import { Game } from 'screen';
import { Pagination, Select } from 'components';
import { Filter } from 'components/Filter';
import { IGame } from 'types/interfaces';

import './style.scss';
import { fetchGameByAuthor } from 'api/fetchGameByAuthor';
import { fetchGameByGenre } from 'api/fetchGameByGenre';
import { fetchPopularGames } from 'api/fetchPopularGames';
import { fetchNewGames } from 'api/fetchNewGames';

const DATA_LIMIT = 8;
enum constants {
  OUR_GAMES = 'Our games',
  NEW_GAMES = 'New games',
  POPULAR_GAMES = 'Popular games',
}

export const Store = () => {
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

  const setGamesByAuthor = async (author: string) => {
    const games = await fetchGameByAuthor(author);
    setGames(games);
  };

  const handleFilterSelect = async (genre: string) => {
    const games = await fetchGameByGenre(genre);
    setGames(games);
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
  console.log(games);
  return (
    <div className="store">
      <Filter
        games={games}
        setGamesByAuthor={setGamesByAuthor}
        deleteFilter={fillGames}
        handleSelect={handleFilterSelect}
      />
      <div className="store__container">
        <Select
          placeholder={'Our games'}
          options={[
            { id: 0, label: 'New games', value: 'New games' },
            { id: 1, label: 'Popular games', value: 'Popular games' },
          ]}
          style="store"
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

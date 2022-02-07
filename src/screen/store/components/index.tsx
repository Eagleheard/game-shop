import React, { useState, useEffect } from 'react';
import { fetchGames } from 'api/fetchGames';
import { fetchNewGames } from 'api/fetchNewGames';
import { fetchPopularGames } from 'api/fetchPopularGames';

import { Game } from 'screen';
import { Pagination, Select, Autocomplete } from 'components';
import { IGame } from 'types/interfaces';

import './style.scss';

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
    <div className="store">
      <div className="filter">
        <Autocomplete author={games.map(({ author }) => author)} />
        <Select
          placeholder={'Genre'}
          options={[
            { id: 0, label: 'Action', value: 'Action' },
            { id: 1, label: 'RPG', value: 'RPG' },
            { id: 2, label: 'Racing', value: 'Racing' },
            { id: 3, label: 'Adventure', value: 'Adventure' },
          ]}
          style="filter"
          handleSelect={handleSelect}
        />
        <div>
          <label>Digital:</label>
          <input type="checkbox" />
        </div>
        <div>
          <label>Disk:</label>
          <input type="checkbox" />
        </div>
        <div>
          <label>Number of copies</label>
          <input />
        </div>
        <div>
          <input placeholder="min" />
          <input placeholder="max" />
        </div>
        <button>Filter</button>
      </div>
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

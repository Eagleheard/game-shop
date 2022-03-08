import React, { useState, useEffect } from 'react';
import { fetchGames } from 'api/fetchGames';
import { fetchNewGames } from 'api/fetchNewGames';
import { fetchPopularGames } from 'api/fetchPopularGames';

import { Card } from 'screen';
import { usePagination } from 'hooks';
import { Pagination, Select, Preview } from 'components';
import { IGame } from 'types/interfaces';

import './style.scss';

const DATA_LIMIT = 4;
enum sortOptions {
  OUR_GAMES = 'Our games',
  NEW_GAMES = 'New games',
  POPULAR_GAMES = 'Popular games',
}

export const Home = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { goToNextPage, goToPreviousPage, changePage, currentPage, page, getPaginatedData } =
    usePagination(games, DATA_LIMIT);

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
      case sortOptions.OUR_GAMES:
        fillGames();
        break;
      case sortOptions.NEW_GAMES:
        setNewGames();
        break;
      case sortOptions.POPULAR_GAMES:
        setPopularGames();
        break;
      default:
        fillGames();
    }
    changePage(1);
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
          placeholder="Our games"
          options={[
            { id: 0, label: 'Our games', value: 'Our games' },
            { id: 1, label: 'New games', value: 'New games' },
            { id: 2, label: 'Popular games', value: 'Popular games' },
          ]}
          style="home"
          handleSelect={handleSelect}
        />
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <Pagination
            RenderComponent={Card}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            currentPage={currentPage}
            page={page}
            getPaginatedData={getPaginatedData}
            changePage={changePage}
          />
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { fetchGames } from 'api/fetchGames';
import { fetchPopularGames } from 'api/fetchPopularGames';
import { fetchNewGames } from 'api/fetchNewGames';

import { Game } from 'screen';
import { Pagination, Select, ResponsiveFilter } from 'components';
import { Filter } from 'components/Filter';
import { IGame, IParams } from 'types/interfaces';
import { usePagination } from 'hooks';

import filter from 'assets/filter.png';

import './style.scss';

const DATA_LIMIT = 8;
enum sortOptions {
  OUR_GAMES = 'Our games',
  NEW_GAMES = 'New games',
  POPULAR_GAMES = 'Popular games',
}

export const Store = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const { goToNextPage, goToPreviousPage, changePage, currentPage, page } =
    usePagination(DATA_LIMIT);

  const fillGames = async (params?: IParams) => {
    try {
      const { data } = await fetchGames(currentPage, DATA_LIMIT, { params });
      setGames(data.rows);
    } catch (e) {
      console.log(e);
    }
  };

  const setNewGames = async () => {
    try {
      const { data } = await fetchNewGames();
      setGames(data.rows);
    } catch (e) {
      console.log(e);
    }
  };

  const setPopularGames = async () => {
    try {
      const { data } = await fetchPopularGames();
      setGames(data.rows);
    } catch (e) {
      console.log(e);
    }
  };

  const setFilter = () => {
    setIsFilterVisible((prevValue) => !prevValue);
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
  };

  useEffect(() => {
    setIsLoading(true);
    fillGames();
    setIsLoading(false);
  }, []);

  return (
    <div className="store">
      <Filter games={games} fillGames={fillGames} />
      {isFilterVisible && (
        <ResponsiveFilter
          fillGames={fillGames}
          games={games}
          handleClose={() => setIsFilterVisible(false)}
        />
      )}
      <div className="store__container">
        <div className="store__options">
          <img src={filter} className="store__filter-icon" onClick={() => setFilter()} />
          <Select
            placeholder="Our games"
            options={[
              { id: 0, label: 'Our games', value: 'Our games' },
              { id: 1, label: 'New games', value: 'New games' },
              { id: 2, label: 'Popular games', value: 'Popular games' },
            ]}
            style="store"
            handleSelect={handleSelect}
          />
        </div>
        {isLoading || !games.length ? (
          <h1 className="store__error">Games not found</h1>
        ) : (
          <Pagination
            RenderComponent={Game}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            currentPage={currentPage}
            page={page}
            getPaginatedData={games}
            changePage={changePage}
          />
        )}
      </div>
    </div>
  );
};

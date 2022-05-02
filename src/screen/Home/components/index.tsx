import React, { useState, useEffect, useCallback } from 'react';
import { fetchGames } from 'api/fetchGames';

import { ToastOptions } from 'types/enumerators';
import { ToastComponent } from 'components/Toast';
import { Card } from 'screen';
import { usePagination, useToast } from 'hooks';
import { Pagination, Select, Preview } from 'components';
import { IGame } from 'types/interfaces';

import './style.scss';

const DATA_LIMIT = 4;

enum sortOptions {
  OUR_GAMES = 'Our games',
  NEW_GAMES = 'New games',
  POPULAR_GAMES = 'Popular games',
}

interface IParams {
  isNew?: boolean;
  order?: string;
}

export const Home = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [params, setParams] = useState<IParams>();
  const { goToNextPage, goToPreviousPage, changePage, currentPage, page } = usePagination(
    DATA_LIMIT,
    params,
  );
  const { openToast } = useToast();

  const fillGames = useCallback(
    async (params?: IParams) => {
      try {
        const { data } = await fetchGames(currentPage, DATA_LIMIT, { params });
        setGames(data.rows);
      } catch ({ response: { data } }) {
        openToast(String(data), ToastOptions.error);
      }
    },
    [currentPage],
  );

  const handleSelect = (value: string) => {
    switch (value) {
      case sortOptions.OUR_GAMES:
        setParams({});
        break;
      case sortOptions.NEW_GAMES:
        setParams({ isNew: true });
        break;
      case sortOptions.POPULAR_GAMES:
        setParams({ order: 'popularity' });
        break;
      default:
        setParams({});
    }
    changePage(1);
  };

  useEffect(() => {
    setIsLoading(true);
    fillGames(params);
    setIsLoading(false);
  }, [currentPage, params, fillGames]);

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
        {isLoading || !games.length ? (
          <h1>Games not found</h1>
        ) : (
          <Pagination
            RenderComponent={Card}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            currentPage={currentPage}
            page={page}
            getPaginatedData={games}
            changePage={changePage}
          />
        )}
      </div>
      <ToastComponent />
    </div>
  );
};

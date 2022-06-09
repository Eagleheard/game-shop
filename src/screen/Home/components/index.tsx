import React, { useState, useEffect, useCallback } from 'react';
import { fetchGames } from 'api/fetchGames';

import { ToastOptions } from 'types/enumerators';
import { ToastComponent } from 'components/Toast';
import { Card } from 'screen';
import { useToast } from 'hooks';
import { Pagination, Select, Preview, Loader } from 'components';

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
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { openToast } = useToast();

  const fillGames = useCallback(
    async (params?: IParams) => {
      try {
        const { data } = await fetchGames(currentPage, DATA_LIMIT, { params });
        setGames(data.rows);
        setTotalPages(data.count);
      } catch ({
        response: {
          data: { message },
        },
      }) {
        openToast(message, ToastOptions.error);
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
    setCurrentPage(1);
  };

  useEffect(() => {
    setIsLoading(true);
    fillGames(params);
    setIsLoading(false);
  }, [currentPage, params, fillGames]);

  return (
    <div className="home">
      <div className="home__container">
        <Preview games={games.filter(({ isPreview }) => isPreview === true)} />
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
          <Loader />
        ) : (
          <Pagination
            RenderComponent={Card}
            getPaginatedData={games}
            currentPage={currentPage}
            totalCount={totalPages}
            pageSize={DATA_LIMIT}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        )}
      </div>
      <ToastComponent />
    </div>
  );
};

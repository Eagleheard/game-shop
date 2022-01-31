import React, { useState, useEffect } from 'react';
import { fetchGames } from 'api/fetchGames';
import { IGame } from 'types/game';

import game1 from 'assets/game1.png';

import { Game, Pagination } from 'screen';

import './style.scss';

const DATA_LIMIT = 3;

export const Home = () => {
  const [game, setGame] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fillGames = async () => {
      const data: IGame[] = await fetchGames();
      return setGame(data);
    };
    setIsLoading(true);
    fillGames();
    setIsLoading(false);
  }, []);

  return (
    <div className="home">
      <img src={game1} className="home__preview"></img>
      <div className="home__games">
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <Pagination gameData={game} RenderComponent={Game} dataLimit={DATA_LIMIT} />
        )}
      </div>
    </div>
  );
};

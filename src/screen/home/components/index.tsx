import React, { useState, useEffect } from 'react';
import { fetchData } from 'api/api';

import game1 from 'assets/game1.png';

import { Game, Pagination } from 'screen';

import './style.scss';

export type Game = {
  id: number;
  name: string;
  genre: string;
  author: string;
  price: string;
  logo: string;
};

export const Home: React.FC<Game> = () => {
  const [game, setGame] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dataLimit = 3;
  useEffect(() => {
    setIsLoading(true);
    const fillGames = async () => {
      const data = await fetchData();
      return setGame(data);
    };
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
          <Pagination gameData={game} RenderComponent={Game} dataLimit={dataLimit} />
        )}
      </div>
    </div>
  );
};

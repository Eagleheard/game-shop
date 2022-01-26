import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Game, Pagination } from 'screen';

import preview from 'assets/preview.jpg';

import './style.scss';

export const Home = () => {
  const [game, setGame] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios('./store.json');
      setGame(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <div className="home">
      <img src={preview} className="home__preview"></img>
      <div className="home__games">
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <Pagination gameData={game} RenderComponent={Game} dataLimit={3} />
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { fetchGames } from 'api/fetchGames';
import classNames from 'classnames';

import game1 from 'assets/game1.png';
import game3 from 'assets/game3.png';

import { Game, Pagination } from 'screen';
import { IGame } from 'types/game';

import './style.scss';

const DATA_LIMIT = 3;

export const Home = () => {
  const [game, setGame] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewPage, setPreviewPage] = useState(0);
  const previewArray = [
    { id: 0, img: game1, name: 'New Game 1', genre: 'action', price: '20$' },
    { id: 1, img: game1, name: 'New Game 2', genre: 'race', price: '20$' },
    { id: 2, img: game3, name: 'New Game 3', genre: 'RPG', price: '20$' },
  ];

  const setNewGames = () => {
    setGame((prevValue) => prevValue.filter((game) => game.new === true));
  };

  const setPopularGames = () => {
    setGame((prevValue) => prevValue.sort((a, b) => (a.popularity < b.popularity ? 1 : -1)));
  };

  useEffect(() => {
    const fillGames = async () => {
      const data = await fetchGames();
      return setGame(data);
    };
    setIsLoading(true);
    fillGames();
    setIsLoading(false);
  }, []);

  return (
    <div className="home">
      <div className="preview">
        {previewArray.map((num) => (
          <div
            key={num.id}
            className={classNames('preview__container', {
              'preview__container--active': num === previewArray[previewPage],
            })}
          >
            <button
              onClick={() => setPreviewPage((prevValue) => prevValue - 1)}
              className="preview__navigation preview__prev-btn"
              disabled={previewPage === 0}
            >
              &laquo;
            </button>
            <img src={num.img} alt="preview logo" className="preview__img"></img>
            <div className="preview__description">
              <p className="preview__name">{num.name}</p>
              <p className="preview__genre">{num.genre}</p>
              <p className="preview__price">Price: {num.price}</p>
            </div>
            <button
              onClick={() => setPreviewPage((prevValue) => prevValue + 1)}
              className="preview__navigation preview__next-btn"
              disabled={previewPage === previewArray.length - 1}
            >
              &raquo;
            </button>
          </div>
        ))}
      </div>
      <div className="sort">
        <button className="sort__btn">Our games ⬇</button>
        <div className="sort__menu">
          <a href="#" onClick={() => setNewGames()}>
            New Games
          </a>
          <a href="#" onClick={() => setPopularGames()}>
            Popular Games
          </a>
        </div>
      </div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Pagination gameData={game} RenderComponent={Game} dataLimit={DATA_LIMIT} />
      )}
    </div>
  );
};

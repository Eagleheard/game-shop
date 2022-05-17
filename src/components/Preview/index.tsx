import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { fetchPreviewGames } from 'api/fetchPreviewGames';

import { ToastOptions } from 'types/enumerators';
import { useToast } from 'hooks';
import { Button } from 'components/Button';
import { IGame } from 'types/interfaces';

import './styles.scss';

export const Preview = () => {
  const [previewPage, setPreviewPage] = useState(0);
  const [previewGames, setPreviewGames] = useState<IGame[]>([]);
  const { openToast } = useToast();

  const setPreviousPreviewPage = () => {
    setPreviewPage((prevValue) => prevValue - 1);
  };

  const setNextPreviewPage = () => {
    setPreviewPage((prevValue) => prevValue + 1);
  };

  const fillPreviewGames = async () => {
    try {
      const { data } = await fetchPreviewGames();
      setPreviewGames(data.rows);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), ToastOptions.error);
    }
  };

  useEffect(() => {
    fillPreviewGames();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (previewPage === previewGames.length - 1) {
        return setPreviewPage(0);
      }
      setPreviewPage((prevValue) => prevValue + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, [previewPage, previewGames.length]);

  return (
    <div className="preview">
      {previewGames.map(({ id, name, genre, price, preview }, index) => (
        <div
          key={id}
          className={classNames('preview__container', {
            'preview__container--active': index === previewPage,
            'preview__container--prev': index === previewPage - 1,
            'preview__container--next': index === previewPage + 1,
          })}
        >
          <img
            src={preview}
            alt="preview logo"
            className={classNames('preview__img', {
              'preview__img--active': index === previewPage,
              'preview__img--prev': index === previewPage - 1,
              'preview__img--next': index === previewPage + 1,
            })}
          ></img>
          <div className="preview__description">
            <h1 className="preview__name">
              <NavLink className="preview__name--link" to={`/game/${id}`}>
                {name}
              </NavLink>
            </h1>
            <p className="preview__genre">Genre: {genre.name}</p>
            <h1 className="preview__price">Price: {price}$</h1>
          </div>
        </div>
      ))}
      <Button
        text="«"
        onClick={setPreviousPreviewPage}
        style="prev-btn"
        disabled={previewPage === 0}
      />
      <Button
        text="»"
        onClick={setNextPreviewPage}
        style="next-btn"
        disabled={previewPage === previewGames.length - 1}
      />
    </div>
  );
};

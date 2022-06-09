import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { Button } from 'components';
import { IGame } from 'types/interfaces';

import './styles.scss';

interface IPreview {
  games: IGame[];
}

export const Preview: React.FC<IPreview> = ({ games }) => {
  const [previewPage, setPreviewPage] = useState(0);

  const setPreviousPreviewPage = () => {
    setPreviewPage((prevValue) => prevValue - 1);
  };

  const setNextPreviewPage = () => {
    setPreviewPage((prevValue) => prevValue + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (previewPage === games.length - 1) {
        return setPreviewPage(0);
      }
      setPreviewPage((prevValue) => prevValue + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, [previewPage, games.length]);

  return (
    <div className="preview" data-testid="container">
      {games.map(({ id, name, genre, price, preview }, index) => (
        <div
          key={id}
          data-testid="preview"
          className={classNames('preview__container', {
            'preview__container--active': index === previewPage,
            'preview__container--prev': index === previewPage - 1,
            'preview__container--next': index === previewPage + 1,
          })}
        >
          <img
            src={preview}
            data-testid={`preview-${index}`}
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
      {games.length !== 0 && (
        <>
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
            disabled={previewPage === games.length - 1}
          />
        </>
      )}
    </div>
  );
};

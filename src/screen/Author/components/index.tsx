import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Pagination } from 'components';
import { usePagination } from 'hooks';
import { Card } from 'screen';
import { IGame } from 'types/interfaces';

import './style.scss';

interface IAuthor {
  name?: string;
  description?: string;
  location?: string;
  popularity?: number;
  image?: string;
  authorGames: IGame[];
}

const DATA_LIMIT = 4;

export const Author: React.FC<IAuthor> = ({
  name,
  description,
  image,
  authorGames,
  location,
  popularity,
}) => {
  const { goToNextPage, goToPreviousPage, changePage, currentPage, page, getPaginatedData } =
    usePagination(authorGames, DATA_LIMIT);
  const history = useNavigate();
  return (
    <div className="author">
      <div className="author__container-btn">
        <Button text="«" onClick={() => history(-1)} style="back-btn" />
      </div>
      <div className="author__container">
        <div className="author__info">
          <img src={image} className="author__logo" />
          <div className="about">
            <p className="about__name">{name}</p>
            <p className="about__location">Location: {location}</p>
            <p className="about__popularity">Popularity: {popularity}%</p>
          </div>
        </div>
        <div className="description">
          <p className="description__label">Description: </p>
          <p className="description__text">{description}</p>
        </div>
      </div>
      <div className="author__games">
        <Pagination
          RenderComponent={Card}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
          currentPage={currentPage}
          page={page}
          getPaginatedData={getPaginatedData}
          changePage={changePage}
        />
      </div>
    </div>
  );
};

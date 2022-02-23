import { Pagination } from 'components';
import { usePagination } from 'hooks';
import React from 'react';

import { Game } from 'screen';
import { IGame } from 'types/interfaces';

import './style.scss';

interface IAuthor {
  name: string;
  description: string;
  location: string;
  popularity: number;
  logo: string;
  authorGames: IGame[];
}

const DATA_LIMIT = 4;

export const Author: React.FC<IAuthor> = ({
  name,
  description,
  logo,
  authorGames,
  location,
  popularity,
}) => {
  const { goToNextPage, goToPreviousPage, changePage, currentPage, page, getPaginatedData } =
    usePagination(authorGames, DATA_LIMIT);

  return (
    <div className="author">
      <div className="author__container">
        <div className="author__info">
          <img src={logo} className="author__logo" />
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
          RenderComponent={Game}
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

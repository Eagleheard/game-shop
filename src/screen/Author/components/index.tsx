import { Pagination } from 'components';
import { usePagination } from 'hooks';
import React from 'react';

import { Game } from 'screen';
import { IGame } from 'types/interfaces';

import './style.scss';

interface IAuthor {
  name: string;
  description: string;
  logo: string;
  authorGames: IGame[];
}

const DATA_LIMIT = 4;

export const Author: React.FC<IAuthor> = ({ name, description, logo, authorGames }) => {
  const { goToNextPage, goToPreviousPage, changePage, currentPage, page, getPaginatedData } =
    usePagination(authorGames, DATA_LIMIT);

  return (
    <div className="author">
      <div className="author__container">
        <img src={logo} className="author__logo" />
        <div className="author__info">
          <p className="author__name">{name}</p>
          <p className="author__description">{description}</p>
        </div>
      </div>
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
  );
};

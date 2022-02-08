import React from 'react';
import classNames from 'classnames';

import { IGame } from 'types/interfaces';
import { Button, usePagination } from 'components';

import './styles.scss';

interface PaginationProps {
  gameData: IGame[];
  dataLimit: number;
  RenderComponent: React.FC<IGame>;
}

export const Pagination: React.FC<PaginationProps> = ({ gameData, dataLimit, RenderComponent }) => {
  const { goToNextPage, goToPreviousPage, changePage, currentPage, pageCount, getPaginatedData } =
    usePagination(gameData, dataLimit);
  const page: number[] = Array.from({ length: pageCount }, (v, i) => i + 1);

  return (
    <div className="pagination">
      <div className="component">
        {getPaginatedData.map((data: IGame) => (
          <RenderComponent key={data.id} {...data} />
        ))}
      </div>
      <div className="pagination__group">
        <Button
          text="«"
          onClick={goToPreviousPage}
          style="pagination-btn"
          disabled={currentPage === 1}
        />
        {page.map((item: number) => (
          <button
            key={item}
            onClick={() => changePage(item)}
            className={classNames('pagination__btn', {
              'pagination__btn--active': currentPage === item,
            })}
          >
            <span>{item}</span>
          </button>
        ))}
        <Button
          text="»"
          onClick={goToNextPage}
          style="pagination-btn"
          disabled={currentPage === page.length}
        />
      </div>
    </div>
  );
};

import React from 'react';
import classNames from 'classnames';

import { IGame } from 'types/interfaces';
import { Button } from 'components';

import './styles.scss';

interface PaginationProps {
  RenderComponent: React.FC<IGame>;
  page: number[];
  getPaginatedData: IGame[];
  currentPage: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  changePage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  getPaginatedData,
  goToNextPage,
  goToPreviousPage,
  changePage,
  page,
  currentPage,
  RenderComponent,
}) => {
  return (
    <div className="pagination">
      <div className="component">
        {getPaginatedData.map((data) => (
          <RenderComponent key={data.id} {...data} data-testid={`game-${data.id}`} />
        ))}
      </div>
      <div className="pagination__group">
        <Button
          text="«"
          data-testid="prev-btn"
          onClick={goToPreviousPage}
          style="pagination-btn"
          disabled={currentPage === 1}
        />
        {page.map((item: number) => (
          <button
            key={item}
            data-testid={`page-${item}`}
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
          data-testid="next-btn"
          onClick={goToNextPage}
          style="pagination-btn"
          disabled={currentPage === page.length}
        />
      </div>
    </div>
  );
};

import React from 'react';
import classNames from 'classnames';

import { usePagination } from 'hooks';
import { IGame } from 'types/interfaces';
import { Button } from 'components';

import './styles.scss';
import { PaginationOptions } from 'types/enumerators';

interface PaginationProps {
  RenderComponent: React.FC<IGame>;
  style?: string;
  getPaginatedData: IGame[];
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  getPaginatedData,
  totalCount,
  onPageChange,
  currentPage,
  RenderComponent,
  style,
  siblingCount = 1,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (paginationRange === undefined || currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className="pagination">
      <div className={`component--${style} component`}>
        {getPaginatedData.map((data) => (
          <RenderComponent key={data.id} {...data} />
        ))}
      </div>
      <div className={`pagination__group--${style} pagination__group`}>
        <Button text="«" onClick={onPrevious} style="pagination-btn" disabled={currentPage === 1} />
        {paginationRange.map((pageNumber) => {
          if (pageNumber === PaginationOptions.dots) {
            return (
              <li key={pageNumber} className="pagination__dots">
                &#8230;
              </li>
            );
          }

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={classNames('pagination__btn', {
                'pagination__btn--active': currentPage === pageNumber,
              })}
            >
              <span>{pageNumber}</span>
            </button>
          );
        })}
        <Button
          text="»"
          onClick={onNext}
          style="pagination-btn"
          disabled={currentPage === lastPage}
        />
      </div>
    </div>
  );
};

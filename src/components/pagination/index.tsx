import React, { useMemo, useState } from 'react';
import classNames from 'classnames';

import { IGame } from 'types/interfaces';
import { Button } from 'components';

import './styles.scss';

interface PaginationProps {
  gameData: IGame[];
  dataLimit: number;
  RenderComponent: React.FC<IGame>;
}

export const Pagination: React.FC<PaginationProps> = ({ gameData, dataLimit, RenderComponent }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageCount = Math.ceil(gameData.length / dataLimit);
  const startIndex = currentPage * dataLimit - dataLimit;
  const endIndex = startIndex + dataLimit;
  const page: number[] = Array.from({ length: pageCount }, (v, i) => i + 1);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginatedData = useMemo(() => {
    return gameData.slice(startIndex, endIndex);
  }, [gameData, startIndex, endIndex]);

  return (
    <div className="pagination">
      <div className="component">
        {getPaginatedData.map((data) => (
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
        {page.map((item: number, index: number) => (
          <button
            key={index}
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

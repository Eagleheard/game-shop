import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import './styles.scss';
import { Game } from 'screen/home/components';

interface PaginationProps {
  gameData: Game[];
  dataLimit: number;
  RenderComponent: any;
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

  const changePage = (num: number) => {
    setCurrentPage(num);
  };

  const getPaginatedData = useMemo(() => {
    return gameData.slice(startIndex, endIndex);
  }, [gameData.slice(startIndex, endIndex)]);

  return (
    <div>
      <div className="component">
        {getPaginatedData.map((d) => (
          <RenderComponent key={d.id} gameData={d} />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className="pagination__navigation"
          disabled={currentPage === 1}
        >
          ⮜
        </button>
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
        <button
          onClick={goToNextPage}
          className="pagination__navigation"
          disabled={currentPage === pageCount}
        >
          ⮞
        </button>
      </div>
    </div>
  );
};

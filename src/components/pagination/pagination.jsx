import React, { useState } from 'react';
import classNames from 'classnames';

import './pagination.scss';

export const Pagination = ({ gameData, RenderComponent, dataLimit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(gameData.length / dataLimit);

  const page = [];
  for (let i = 1; i <= pageCount; i++) {
    page.push(i);
  }

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const changePage = (num) => {
    setCurrentPage(num);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return gameData.slice(startIndex, endIndex);
  };

  return (
    <div>
      <div className="component">
        {getPaginatedData().map((d, idx) => (
          <RenderComponent key={idx} gameData={d} />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={classNames('pagination__prev-btn', {
            'pagination__prev-btn--disabled': currentPage === 1,
          })}
        >
          prev
        </button>
        {page.map((item, index) => (
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
          className={classNames('pagination__next-btn', {
            'pagination__next-btn--disabled': currentPage === pageCount,
          })}
        >
          next
        </button>
      </div>
    </div>
  );
};

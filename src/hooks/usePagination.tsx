/*import { useState } from 'react';

export const usePagination = (dataLimit, totalPages) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(totalPages / dataLimit);
  const page = Array.from({ length: pageCount }, (v, i) => i + 1);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return {
    goToNextPage,
    goToPreviousPage,
    changePage,
    currentPage,
    page,
  };
};*/

import React, { useMemo } from 'react';

import { PaginationOptions } from 'types/enumerators';

interface IUsePagination {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
}

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: IUsePagination) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, PaginationOptions.dots, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, PaginationOptions.dots, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [
        firstPageIndex,
        PaginationOptions.dots,
        ...middleRange,
        PaginationOptions.dots,
        lastPageIndex,
      ];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

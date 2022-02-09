import { useState, useMemo } from 'react';

export const usePagination = (gameData, dataLimit) => {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = currentPage * dataLimit - dataLimit;
  const endIndex = startIndex + dataLimit;
  const pageCount = Math.ceil(gameData.length / dataLimit);
  const page = Array.from({ length: pageCount }, (v, i) => i + 1);

  const getPaginatedData = useMemo(() => {
    return gameData.slice(startIndex, endIndex);
  }, [gameData, startIndex, endIndex]);

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
    getPaginatedData,
    currentPage,
    startIndex,
    endIndex,
    page,
  };
};

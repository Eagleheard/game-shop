import { useState, useMemo } from 'react';

export const usePagination = (gameData, dataLimit, pageValue) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(pageValue / dataLimit);
  const page = Array.from({ length: pageCount }, (v, i) => i + 1);

  const getPaginatedData = useMemo(() => {
    return gameData;
  }, [gameData]);

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
    page,
  };
};

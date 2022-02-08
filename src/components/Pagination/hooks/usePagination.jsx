import { useState, useMemo } from 'react';

function usePagination(gameData, dataLimit) {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = currentPage * dataLimit - dataLimit;
  const endIndex = startIndex + dataLimit;
  const pageCount = Math.ceil(gameData.length / dataLimit);
  const getPaginatedData = useMemo(() => {
    return gameData.slice(startIndex, endIndex);
  }, [gameData, startIndex, endIndex]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return {
    goToNextPage,
    goToPreviousPage,
    changePage,
    getPaginatedData,
    currentPage,
    pageCount,
    startIndex,
    endIndex,
  };
}
export default usePagination;

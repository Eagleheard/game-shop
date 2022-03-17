import { useState, useMemo, useEffect } from 'react';

import { fetchGames } from 'api/fetchGames';

export const usePagination = (gameData, dataLimit, params) => {
  const [pageValue, setPageValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(pageValue / dataLimit);
  const page = Array.from({ length: pageCount }, (v, i) => i + 1);

  const getPaginatedData = useMemo(() => {
    return gameData;
  }, [gameData]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const fetchPageValue = async () => {
    try {
      const { data } = await fetchGames(currentPage, dataLimit, { params });
      console.log(data);
      setPageValue(data.count);
    } catch (e) {
      console.log(e);
    }
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    fetchPageValue(params);
  }, [params]);

  return {
    goToNextPage,
    goToPreviousPage,
    changePage,
    getPaginatedData,
    currentPage,
    page,
  };
};

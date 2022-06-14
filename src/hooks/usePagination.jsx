import { useState, useEffect } from 'react';

import { useToast } from './useToast';
import { ToastOptions } from 'types/enumerators';
import { fetchGames } from 'api/fetchGames';

export const usePagination = (dataLimit, params) => {
  const [pageValue, setPageValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { openToast } = useToast();
  const pageCount = Math.ceil(pageValue / dataLimit);
  const page = Array.from({ length: pageCount }, (v, i) => i + 1);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const fetchPageValue = async () => {
    try {
      const { data } = await fetchGames(currentPage, dataLimit, { params });
      setPageValue(data.count);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(message, ToastOptions.error);
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
    currentPage,
    page,
  };
};

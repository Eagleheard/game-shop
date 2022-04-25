import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameByAuthor } from 'api/fetchGameByAuthor';
import { fetchAuthor } from 'api/fetchAuthor';

import { IAuthor, IGame } from 'types/interfaces';
import { Author } from '.';
import useToast from 'components/Toast';

export const AuthorContainer = () => {
  const { id } = useParams<string>();
  const [authorInfo, setAuthorInfo] = useState<IAuthor>();
  const [authorGames, setAuthorGames] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { openToast, ToastComponent, setMessage } = useToast('error');

  const searchAuthor = useCallback(async () => {
    try {
      const { data } = await fetchAuthor(id);
      setAuthorInfo(data);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      setMessage(String(message));
      openToast();
    }
  }, [id]);

  const searchAuthorGames = useCallback(async () => {
    try {
      const { data } = await fetchGameByAuthor(id);
      setAuthorGames(data.rows);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      setMessage(String(message));
      openToast();
    }
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    searchAuthor();
    searchAuthorGames();
    setIsLoading(false);
  }, [searchAuthor, searchAuthorGames]);

  return !isLoading && authorInfo ? (
    <Author {...authorInfo} authorGames={authorGames} {...ToastComponent} />
  ) : (
    <p>Loading</p>
  );
};

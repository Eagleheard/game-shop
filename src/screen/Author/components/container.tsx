import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameByAuthor } from 'api/fetchGameByAuthor';
import { fetchAuthor } from 'api/fetchAuthor';

import { IAuthor, IGame } from 'types/interfaces';
import { Author } from '.';

export const AuthorContainer = () => {
  const { id } = useParams<string>();
  const [authorInfo, setAuthorInfo] = useState<IAuthor>();
  const [authorGames, setAuthorGames] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchAuthor = useCallback(async () => {
    try {
      const { data } = await fetchAuthor(id);
      setAuthorInfo(data);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  const searchAuthorGames = useCallback(async () => {
    try {
      const data = await fetchGameByAuthor(id);
      setAuthorGames(data);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    searchAuthor();
    searchAuthorGames();
    setIsLoading(false);
  }, [searchAuthor, searchAuthorGames]);

  return isLoading ? <p>Loading...</p> : <Author {...authorInfo} authorGames={authorGames} />;
};

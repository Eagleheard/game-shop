import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameByAuthor } from 'api/fetchGameByAuthor';
import { fetchAuthor } from 'api/fetchAuthor';

import { IAuthor, IGame } from 'types/interfaces';
import { Author } from '.';

export const AuthorContainer = () => {
  const { author } = useParams<string>();
  const [authorInfo, setAuthorInfo] = useState<IAuthor[]>([]);
  const [authorGames, setAuthorGames] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchAuthor = useCallback(async () => {
    const data = await fetchAuthor(author);
    setAuthorInfo(data);
  }, [author]);

  const searchAuthorGames = useCallback(async () => {
    const data = await fetchGameByAuthor(author);
    setAuthorGames(data);
  }, [author]);

  useEffect(() => {
    setIsLoading(true);
    searchAuthor();
    searchAuthorGames();
    setIsLoading(false);
  }, [searchAuthor, searchAuthorGames]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    authorInfo.map(({ id, name, description, logo }) => (
      <Author
        key={id}
        name={name}
        description={description}
        logo={logo}
        authorGames={authorGames}
      />
    ))
  );
};

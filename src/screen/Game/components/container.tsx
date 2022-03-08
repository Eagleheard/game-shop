import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGame } from 'api/fetchGame';

import { IGame } from 'types/interfaces';
import { GamePage } from '.';

export const GamePageContainer = () => {
  const { id } = useParams<string>();
  const [gameInfo, setGameInfo] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchGame = useCallback(async () => {
    const data = await fetchGame(id);
    setGameInfo(data);
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    searchGame();
    setIsLoading(false);
  }, [searchGame]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    gameInfo.map(({ id, name, image, popularity, genre, author, price, description }) => (
      <GamePage
        key={id}
        name={name}
        popularity={popularity}
        image={image}
        genre={genre}
        author={author}
        price={price}
        description={description}
      />
    ))
  );
};

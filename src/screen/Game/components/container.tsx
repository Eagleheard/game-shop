import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from 'config';

import { IGame } from 'types/interfaces';
import { GamePage } from '.';
import { fetchGame } from 'api/fetchGame';

export const GamePageContainer = () => {
  const { id } = useParams<string>();
  const [gameInfo, setGameInfo] = useState<IGame>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchGameInfo = useCallback(async () => {
    try {
      const { data } = await fetchGame(id);
      setGameInfo(data);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    fetchGameInfo();
    socket.connect();
    socket.on('newGameInfo', (data) => {
      setGameInfo(data);
    });
    setIsLoading(false);
    return () => {
      socket.disconnect();
    };
  }, [gameInfo]);

  return isLoading ? <p>Loading...</p> : <GamePage {...gameInfo} />;
};

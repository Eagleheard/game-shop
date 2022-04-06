import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from 'config';

import { IGame } from 'types/interfaces';
import { GamePage } from '.';

export const GamePageContainer = () => {
  const { id } = useParams<string>();
  const [gameInfo, setGameInfo] = useState<IGame>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    socket.connect();
    socket.on('selectedGame', (data) => {
      setGameInfo(data);
    });
    socket.emit('game', id);
    setIsLoading(false);
    return () => {
      socket.disconnect();
    };
  }, [gameInfo]);

  return isLoading ? <p>Loading...</p> : <GamePage {...gameInfo} />;
};

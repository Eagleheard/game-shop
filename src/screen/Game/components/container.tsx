import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from 'config';

import { IGame } from 'types/interfaces';
import { GamePage } from '.';
import { fetchGame } from 'api/fetchGame';
import useToast from 'components/Toast';

export const GamePageContainer = () => {
  const { id } = useParams<string>();
  const [gameInfo, setGameInfo] = useState<IGame>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const { openToast, ToastComponent } = useToast(errorMessage, 'error');

  const fetchGameInfo = useCallback(async () => {
    try {
      const { data } = await fetchGame(id);
      setGameInfo(data);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      setErrorMessage(String(message));
      openToast();
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
  }, [gameInfo, fetchGameInfo]);

  return errorMessage ? <ToastComponent /> : <GamePage {...gameInfo} />;
};

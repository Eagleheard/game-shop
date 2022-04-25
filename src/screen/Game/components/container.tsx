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
  const { openToast, ToastComponent, setMessage } = useToast('error');

  const fetchGameInfo = useCallback(async () => {
    try {
      const { data } = await fetchGame(id);
      setGameInfo(data);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      setMessage(String(message));
      openToast();
    }
  }, [id, openToast]);

  useEffect(() => {
    socket.connect();
    socket.on('newGameInfo', (data) => {
      console.log(data);
      setGameInfo(data);
    });
    return () => {
      socket.disconnect();
    };
  });

  useEffect(() => {
    setIsLoading(true);
    fetchGameInfo();
    setIsLoading(false);
  }, []);

  return !isLoading && gameInfo ? <GamePage {...gameInfo} /> : <ToastComponent />;
};

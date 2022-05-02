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
  const { openToast, ToastComponent } = useToast();

  const fetchGameInfo = useCallback(async () => {
    try {
      const { data } = await fetchGame(id);
      setGameInfo(data);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), 'error');
    }
  }, [id, openToast]);

  useEffect(() => {
    fetchGameInfo();
    socket.connect();
    socket.on('newGameInfo', (data) => {
      setGameInfo(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return gameInfo ? <GamePage {...gameInfo} /> : <p>loadi</p>;
};

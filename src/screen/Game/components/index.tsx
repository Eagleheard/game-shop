import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useAuth } from 'hooks/useAuth';
import { Button, Portal, SignIn } from 'components';
import { addGameRequest } from 'store/cart/actions';
import { ToastOptions } from 'types/enumerators';
import { ToastComponent } from 'components/Toast';
import { useToast } from 'hooks';
import { CartState } from 'store/cart/types';

import './PageStyles.scss';

interface IGamePage {
  id?: number;
  name?: string;
  preview?: string;
  popularity?: number;
  price?: number;
  genre?: {
    id: number;
    name: string;
  };
  author?: {
    id: number;
    name: string;
  };
  description?: string;
  count?: string;
}

export const GamePage: React.FC<IGamePage> = ({
  id,
  name,
  preview,
  popularity,
  price,
  genre,
  author,
  description,
  count,
}) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [buyingCount, setBuyingCount] = useState(1);
  const [isSignInVisible, setIsSignInVisible] = useState<boolean>(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState<boolean>(false);
  const [isGameBuyed, setIsGameBuyed] = useState<boolean>(false);
  const { user } = useAuth();

  const handleSwitch = () => {
    if (isSignInVisible) {
      setIsSignInVisible(false);
      setIsSignUpVisible(true);
      return;
    }
    if (isSignUpVisible) {
      setIsSignInVisible(true);
      setIsSignUpVisible(false);
      return;
    }
  };

  const { openToast } = useToast();
  const { gameError, isLoading } = useSelector((state: CartState) => state.cartReducer || []);

  const handleBuy = () => {
    dispatch(addGameRequest(id, buyingCount));
    if (!gameError && !isLoading) {
      return openToast('Successfully added to cart', ToastOptions.success);
    }
  };

  useEffect(() => {
    if (gameError && !isLoading) {
      return openToast('Something wrong', ToastOptions.error);
    }
  }, [gameError, isLoading]);

  return (
    <div className="game">
      <div className="game__container-btn">
        <Button text="«" onClick={() => history(-1)} style="back-btn" />
      </div>
      <div className="game__container">
        <div className="game__info">
          <img src={preview} className="game__logo" />
          <div className="about">
            <div className="about__property">
              <p className="about__name">{name}</p>
              <p className="about__genre">Genre: {genre?.name}</p>
              <p className="about__author">
                Author:
                <NavLink className="about__author--link" to={`/author/${author?.id}`}>
                  {author?.name}
                </NavLink>
              </p>
              <p className="about__popularity">Popularity: {popularity}%</p>
              {count ? <p className="about__count">Count: {count}</p> : null}
              {count && (
                <div className="about__buying-count">
                  <Button
                    text="-"
                    onClick={() => setBuyingCount((prevValue) => prevValue - 1)}
                    style="cart-btn"
                    disabled={buyingCount === 1}
                  />
                  <p className="about__buying-value">{buyingCount}</p>
                  <Button
                    text="+"
                    onClick={() => setBuyingCount((prevValue) => prevValue + 1)}
                    style="cart-btn"
                    disabled={buyingCount === parseInt(count) || buyingCount === 10}
                  />
                </div>
              )}
            </div>
            <div className="game__buying">
              {user ? (
                !isGameBuyed ? (
                  <Button text="Buy now" onClick={handleBuy} style="buy" />
                ) : (
                  <Button
                    text="Go to cart"
                    onClick={() => history(`/cart/${user.id}`)}
                    style="buy"
                  />
                )
              ) : (
                <Button text="Sign In" onClick={() => setIsSignInVisible(true)} style="buy" />
              )}
              <p className="game__price">Price: {price}$</p>
            </div>
          </div>
        </div>
        <div className="description">
          <p className="description__label">Description: </p>
          <p className="description__text">{description}</p>
        </div>
      </div>
      <Portal
        Component={() => <SignIn handleSwitch={handleSwitch} />}
        isOpen={isSignInVisible}
        text="Sign In"
        handleClose={() => setIsSignInVisible(false)}
      />
    </div>
  );
};

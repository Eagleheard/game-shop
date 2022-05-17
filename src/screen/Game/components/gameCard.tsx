import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addGameRequest,
  decrementGameRequest,
  incrementGameRequest,
  removeGameRequest,
} from 'store/cart/actions';
import { IGame } from 'types/interfaces';
import { Button } from 'components';
import { useAuth } from 'hooks/useAuth';
import { ToastOptions } from 'types/enumerators';
import { useToast } from 'hooks';
import { CartState } from 'store/cart/types';

import grey_cross from 'assets/grey-cross.png';

import {
  CardAdditionalInformation,
  CardAuthor,
  CardBuyButton,
  CardComponent,
  CardDescription,
  CardGenre,
  CardImg,
  CardLabel,
  CardMainInformation,
  CardNavLink,
  CardNavLinkToCart,
  CardParagraph,
  CardQuantity,
  CardQuantityValue,
  OrderTotalPrice,
} from './styled-components';

const quantityLimit = 10;

export const Card = ({
  id,
  name,
  genre,
  author,
  price,
  image,
  quantity,
  purchaseDate,
  disk,
  count,
  cart,
  order,
  search,
}: IGame) => {
  const dispatch = useDispatch();
  const { openToast } = useToast();
  const { gameError, isLoading } = useSelector((state: CartState) => state.cartReducer || []);
  const { user } = useAuth();

  const handleBuy = () => {
    dispatch(addGameRequest(id, 1));
    if (!gameError && !isLoading) {
      return openToast(
        <>
          Successfully added to cart
          <CardNavLinkToCart to={`/cart/${user.id}`} className="link">
            Go to cart?
          </CardNavLinkToCart>
        </>,
        ToastOptions.success,
      );
    }
    if (gameError) {
      return openToast('Game already in cart', ToastOptions.error);
    }
  };

  return (
    <CardComponent search={search} cart={cart} order={order}>
      {user && !purchaseDate && !quantity && (
        <CardBuyButton>
          <Button disabled={count === 0} text="Buy now" onClick={handleBuy} style="card-buy" />
        </CardBuyButton>
      )}
      <CardImg search={search} order={order} cart={cart} src={image} alt="logo"></CardImg>
      <CardDescription search={search} order={order} cart={cart}>
        <CardMainInformation order={order} cart={cart}>
          <CardLabel order={order} cart={cart}>
            <CardNavLink to={`/game/${id}`}>{name}</CardNavLink>
          </CardLabel>
          {genre && <CardGenre search={search}>{genre.name}</CardGenre>}
          {purchaseDate && (
            <CardParagraph order={order} cart={cart}>
              Date of purchase: {purchaseDate}
            </CardParagraph>
          )}
          {quantity && purchaseDate && (
            <CardParagraph order={order} cart={cart}>
              Quantity: {quantity}
            </CardParagraph>
          )}
          {quantity && !purchaseDate && (
            <p className="card__type">Type: {disk ? 'disk' : 'digital'}</p>
          )}
          {quantity && disk && !purchaseDate && (
            <CardQuantityValue>
              <Button
                text="-"
                onClick={() => dispatch(decrementGameRequest(id))}
                style="cart-btn"
                disabled={quantity === 1}
              />
              <CardQuantity>{quantity}</CardQuantity>
              <Button
                text="+"
                onClick={() => dispatch(incrementGameRequest(id))}
                style="cart-btn"
                disabled={count === 0 || quantity === quantityLimit}
              />
            </CardQuantityValue>
          )}
        </CardMainInformation>
        {purchaseDate && (
          <OrderTotalPrice>Price: {quantity ? price * quantity : price}$</OrderTotalPrice>
        )}
        <CardAdditionalInformation order={order} cart={cart}>
          {quantity && !purchaseDate && (
            <button className="card__remove-btn" onClick={() => dispatch(removeGameRequest(id))}>
              <img src={grey_cross} />
            </button>
          )}
          {!purchaseDate && (
            <CardLabel order={order} cart={cart}>
              Price: {price}$
            </CardLabel>
          )}
          {author && (
            <CardAuthor search={search}>
              <CardNavLink to={`/author/${author.id}`}>{author.name}</CardNavLink>
            </CardAuthor>
          )}
        </CardAdditionalInformation>
      </CardDescription>
    </CardComponent>
  );
};

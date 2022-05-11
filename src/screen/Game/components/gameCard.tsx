import React from 'react';
import { useDispatch } from 'react-redux';

import { decrementGameRequest, incrementGameRequest, removeGameRequest } from 'store/cart/actions';
import { IGame } from 'types/interfaces';
import { Button } from 'components';

import grey_cross from 'assets/grey-cross.png';

import {
  CardAdditionalInformation,
  CardAuthor,
  CardComponent,
  CardDescription,
  CardDiscount,
  CardGenre,
  CardImg,
  CardLabel,
  CardMainInformation,
  CardNavLink,
  CardParagraph,
  CardPaymentInformation,
  CardPrice,
  CardPriceInformation,
  CardQuantity,
  CardQuantityValue,
  OrderTotalPrice,
} from './styled-components';

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
  discount,
}: IGame) => {
  const dispatch = useDispatch();
  const discountedPrice = discount
    ? price - (price * parseInt(discount.discountCount)) / 100
    : null;
  return (
    <CardComponent cart={cart} order={order}>
      <CardImg order={order} cart={cart} src={image} alt="logo"></CardImg>
      <CardDescription order={order} cart={cart}>
        <CardMainInformation order={order} cart={cart}>
          <CardLabel order={order} cart={cart}>
            <CardNavLink to={`/game/${id}`}>{name}</CardNavLink>
          </CardLabel>
          {genre && <CardGenre>{genre.name}</CardGenre>}
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
                disabled={parseInt(count) === 0}
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
          <CardPaymentInformation>
            {!purchaseDate && discount && (
              <CardDiscount cart={cart}>-{discount.discountCount}%</CardDiscount>
            )}
            <CardPriceInformation>
              {!purchaseDate && discount ? (
                <CardPrice cart={cart}>{price}$</CardPrice>
              ) : (
                <CardLabel cart={cart}>{price}$</CardLabel>
              )}
              {!purchaseDate && discount && <CardLabel cart={cart}>{discountedPrice}$</CardLabel>}
            </CardPriceInformation>
          </CardPaymentInformation>
          {author && (
            <CardAuthor>
              <CardNavLink to={`/author/${author.id}`}>{author.name}</CardNavLink>
            </CardAuthor>
          )}
        </CardAdditionalInformation>
      </CardDescription>
    </CardComponent>
  );
};

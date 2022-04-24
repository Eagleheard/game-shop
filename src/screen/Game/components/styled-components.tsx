import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const black = '#000000';
const lato = 'Lato';
const hoverLink = '#1ba8a8';
const primary = '#ffffff';

interface ICard {
  cart?: boolean;
  order?: boolean;
  search?: boolean;
}

export const CardComponent = styled.div<ICard>`
  display: flex;
  flex-direction: ${({ cart, order, search }) => (search || cart || order ? 'row' : 'column')};
  align-items: center;
  justify-self: center;
  border-radius: 10px;
  width: ${({ cart, order }) => (cart || order ? '90%' : '100%')};
  box-shadow: ${({ search }) => (search ? 'none' : `0 0 10px ${black};`)}
  background: ${primary};
  text-decoration: none;
  color: ${black};
  ${({ cart, order }) =>
    cart || order
      ? `
    margin: 10px; 
    align-self: center;
  `
      : null}
  ${({ search }) => search && 'justify-content: space-around;'}

  @media (max-width: 1024px) {
    width: 90%;
    margin: 10px;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const CardImg = styled.img<ICard>`
  border-radius: 25% 10%;
  margin: 10px;
  width: 180px;
  height: 180px;
  ${({ cart, order }) =>
    cart || order
      ? `
          width: 100px; 
          height: 100px;
        `
      : null}
  ${({ search }) =>
    search &&
    `
      width: 50px;
      height: 50px;
  `}

  @media (max-width: 1024px) {
    width: ${({ cart, order }) => (cart || order ? '100px' : '200px')};
    height: ${({ cart, order }) => (cart || order ? '100px' : '200px')};
    width: ${({ search }) => search && '50px'};
    height: ${({ search }) => search && '50px'};
  }

  @media (max-width: 600px) {
    ${({ search }) => search && `margin: 0;`}
    width: ${({ search }) => (search ? '50px' : '160px')};
    height: ${({ search }) => (search ? '50px' : '160px')};
  }

  @media (max-width: 500px) {
    width: ${({ search }) => (search ? '50px' : '140px')};
    height: ${({ search }) => (search ? '50px' : '140px')};
  }
`;

export const CardDescription = styled.div<ICard>`
  display: flex;
  flex-direction: row;
  font-family: ${lato};
  ${({ cart, order }) =>
    cart || order
      ? `flex-direction: row; 
         justify-content: space-between;
         align-items: flex-start;
         width: 100%;
         height: 15vh;`
      : null}
  ${({ search }) => search && `justify-content: space-between; width: 100%;`}
`;

export const CardMainInformation = styled.div<ICard>`
  display: block;
  ${({ cart }) =>
    cart &&
    `
      display: flex;
      flex-direction: column;
      padding: 10px 0; 
      height: 15vh; 
      width: 100%;
    `}
  ${({ order }) =>
    order &&
    `
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 15vh;
    `}
`;

export const CardAdditionalInformation = styled.div<ICard>`
  display: ${({ order }) => (order && 'none') || 'flex'};
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  height: ${({ cart }) => (cart ? '13vh' : '100%')};
`;

export const CardQuantity = styled.p<ICard>`
  font-family: ${lato};
  margin-top: auto;
  font-size: 14px;
  padding: 0 10px;
`;

export const CardQuantityValue = styled.div<ICard>`
  display: flex;
  flex-direction: row;
  margin-top: auto;
`;

export const OrderTotalPrice = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  align-self: flex-end;
  width: 35%;
`;

export const CardParagraph = styled.p<ICard>`
  font-size: 14px;
  padding: ${({ cart, order }) => (cart || order ? '0' : '0 7px')};

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

export const CardLabel = styled(CardParagraph)<ICard>`
  font-weight: bold;
`;

export const CardNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${black};

  &:hover {
    color: ${hoverLink};
  }
`;

export const CardGenre = styled.p<ICard>`
  ${({ search }) => search && `display: none;`}
  font-size: 14px;
  padding: 10px;

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

export const CardAuthor = styled.p<ICard>`
  ${({ search }) => search && `display: none;`}
  font-size: 14px;
  padding: 10px;
  text-decoration: none;
  color: ${black};

  @media (max-width: 500px) {
    font-size: 12px;
  }

  &--link {
    text-decoration: none;
    color: ${black};

    &:hover {
      color: ${hoverLink};
    }
  }
`;

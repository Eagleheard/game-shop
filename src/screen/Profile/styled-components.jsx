import styled from 'styled-components';

export const ProfileComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .card {
    flex-direction: row;
    width: 90%;
    margin: 10px;
    align-self: center;
    justify-content: space-between;

    &__img {
      width: 100px;
      height: 100px;
    }

    &__description {
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
    }

    &__side-information {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 90%;
    }

    &__purchase-date,
    &__order-quantity {
      font-size: 14px;
      font-family: $lato;
      padding: 0 10px;
      margin: 5px 0;
    }

    &__order-status {
      font-size: 14px;
      font-family: $lato;
    }

    @media (max-width: 768px) {
      width: 90%;
    }
  }
`;

export const ProfileContainer = styled.div`
  width: 70%;
  height: 93vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px 0;
  box-shadow: 0 0 10px black;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 90%;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }
`;

export const ProfileNavigation = styled.div`
  width: 50%;
  margin-top: 20px;

  @media (max-width: 500px) {
    width: 80%;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: lato;
  width: 35%;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const ProfileContent = styled.div`
  width: 40%;
  font-family: lato;
  align-self: flex-start;
  display: flex;
  overflow: auto;
  flex-direction: column;

  .select {
    align-self: flex-end;
    margin: 20px 20px;

    @media (max-width: 1024px) {
      width: 50%;
    }

    @media (max-width: 768px) {
      width: 30%;
    }

    @media (max-width: 500px) {
      width: 40%;
      font-size: 14px;
    }
  }

  @media (max-width: 768px) {
    width: 90%;
    align-self: center;
  }
`;

export const ProfilePhoto = styled.img`
  width: 50%;
  height: 25%;
  border-radius: 15px;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 50%;
    height: 20vh;
  }
`;

export const ProfileName = styled.p`
  font-weight: bold;
  margin-top: 10px;
`;

export const ProfileEmail = styled.p`
  margin: 5px 0;
`;

export const ProfileLabel = styled.h1`
  margin-left: 20px;
`;

export const ProfileUploadPhoto = styled.label`
  color: #3f3dc9;
  margin-top: 10px;
  cursor: pointer;
`;

export const ProfileUploadPhotoButton = styled.input`
  display: none;
`;

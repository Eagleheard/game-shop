import React from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import grey_cross from 'assets/grey-cross.png';

import './styles.scss';

interface ILogin {
  handleClose: () => void;
}

export const Login: React.FC<ILogin> = ({ handleClose }) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div className="login">
      <button className="responsive-filter__close-btn" onClick={handleClose}>
        <img src={grey_cross} />
      </button>
      <form onSubmit={handleSubmit(submitForm)} className="form">
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
      </form>
    </div>
  );
};

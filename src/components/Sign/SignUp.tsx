import { Button } from 'components/Button';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ISign } from 'types/interfaces';
import { SignIn } from './SignIn';

import './styles.scss';

export const SignUp: React.FC<ISign> = ({ handleSwitch }) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit(submitForm)} className="login__form">
        <input type="text" placeholder="name" className="login__name" />
        <input type="text" placeholder="lastname" className="login__lastname" />
        <input type="text" placeholder="email" className="login__email" />
        <input
          type="password"
          autoComplete="on"
          placeholder="password"
          className="login__password"
        />
        <div className="login__submit">
          <h5 className="login__sign--link" onClick={handleSwitch}>
            Or sign In
          </h5>
          <Button text="Sign Up" onClick={() => submitForm} style="sign-in" />
        </div>
      </form>
    </div>
  );
};

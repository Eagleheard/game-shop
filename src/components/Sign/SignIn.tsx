import { Button } from 'components/Button';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ISign } from 'types/interfaces';

import './styles.scss';

export const SignIn: React.FC<ISign> = ({ handleSwitch }) => {
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
        <input type="text" placeholder="email" className="login__email" />
        <input
          type="password"
          autoComplete="on"
          placeholder="password"
          className="login__password"
        />
        <div className="login__submit">
          <h5 className="login__sign">
            Dont have account?
            <p className="login__sign--link" onClick={handleSwitch}>
              Sign up!
            </p>
          </h5>
          <Button text="Sign In" onClick={() => submitForm} style="sign-in" />
        </div>
      </form>
    </div>
  );
};

import { Authorization } from 'api/authorization';
import { Button } from 'components/Button';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ISign } from 'types/interfaces';

import './styles.scss';

export const SignIn: React.FC<ISign> = ({ handleSwitch }) => {
  const { handleSubmit, register } = useForm();

  const signIn = async (params: object) => {
    try {
      const { data } = await Authorization(params);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    signIn(data);
    console.log(data);
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit(submitForm)} className="login__form">
        <input {...register('email')} type="text" placeholder="email" className="login__email" />
        <input
          {...register('password')}
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

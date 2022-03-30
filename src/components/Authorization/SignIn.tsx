import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { login } from 'api/authorization';
import { Button } from 'components/Button';
import { useAuth } from 'hooks/useAuth';
import { ISign, IUser } from 'types/interfaces';
import { AuthorizationOptions } from 'types/enumerators';

import './styles.scss';

export const SignIn: React.FC<ISign> = ({ handleSwitch }) => {
  const { setUser } = useAuth();
  const [error, setError] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const signIn = async (params?: IUser) => {
    try {
      const { data } = await login(params);
      setUser(data);
    } catch (error) {
      setError(true);
    }
  };

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    signIn(data);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(submitForm)} className="login__form">
        {(error || errors.email) && <p className="login__error">Wrong password or email</p>}
        <div className="login__group">
          <input
            {...register('email', {
              validate: (value) => value !== AuthorizationOptions.EMAIL_VALIDATION,
              required: true,
            })}
            type="text"
            id="email"
            placeholder="Email"
            className="login__email"
          />
          <label htmlFor="email" className="login__label">
            Email
          </label>
        </div>
        <div className="login__group">
          <input
            {...register('password')}
            type="password"
            id="password"
            autoComplete="on"
            placeholder="password"
            className="login__password"
          />
          <label htmlFor="password" className="login__label">
            Password
          </label>
        </div>
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

import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { AuthorizationOptions } from 'types/enumerators';
import { useAuth } from 'hooks/useAuth';
import { registration } from 'api/authorization';
import { Button } from 'components/Button';
import { ISign, IUser } from 'types/interfaces';

import './styles.scss';

export const SignUp: React.FC<ISign> = ({ handleSwitch }) => {
  const { user } = useAuth();
  const [error, setError] = useState<string>('');
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const signUp = async (params: IUser) => {
    try {
      await registration(params);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      setError(String(message));
    }
  };

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    if (!user) {
      return signUp(data);
    }
    if (user.role === 'ADMIN') {
      return signUp({ ...data, role: 'MANAGER' });
    }
  };

  return (
    <div className="login">
      {user && <h1>Create manager</h1>}
      <form onSubmit={handleSubmit(submitForm)} className="login__form">
        <div className="login__group">
          <input
            type="text"
            id="name"
            placeholder="name"
            onKeyPress={(e) => /[0-9]/.test(e.key) && e.preventDefault()}
            className="login__name"
            {...register('name', {
              required: true,
              validate: (value) => value.length < AuthorizationOptions.NAME_LENGTH,
            })}
          />
          <label htmlFor="name" className="login__label">
            First Name
          </label>
          {errors.name && <p className="login__name--error">Your name is too long</p>}
        </div>
        <div className="login__group">
          <input
            type="text"
            id="lastname"
            placeholder="lastname"
            onKeyPress={(e) => /[0-9]/.test(e.key) && e.preventDefault()}
            className="login__lastname"
            {...register('lastName', {
              required: true,
              validate: (value) => value.length < AuthorizationOptions.NAME_LENGTH,
            })}
          />
          <label htmlFor="lastname" className="login__label">
            Last Name
          </label>
          {errors.lastName && <p className="login__lastname--error">Your last name is too long</p>}
        </div>
        <div className="login__group">
          <input
            type="text"
            id="email"
            placeholder="email"
            className="login__email"
            {...register('email', {
              validate: (value) => value !== AuthorizationOptions.EMAIL_VALIDATION,
              required: true,
            })}
          />
          <label htmlFor="email" className="login__label">
            Email
          </label>
          {(errors.email && <p className="login__email--error">Check your email</p>) || (
            <p className="login__email--error">{error}</p>
          )}
        </div>
        <div className="login__group">
          <input
            type="password"
            autoComplete="on"
            id="password"
            placeholder="password"
            className="login__password"
            {...register('password', {
              validate: (value) => value.length >= AuthorizationOptions.PASSWORD_LENGTH,
            })}
          />
          <label htmlFor="password" className="login__label">
            Password
          </label>
          {errors.password && <p className="login__password--error">Password too short</p>}
        </div>
        <div className="login__submit">
          {!user && (
            <div className="login__sign-up">
              <h5 className="login__sign">Or</h5>
              <h5 className="login__sign--link" onClick={handleSwitch}>
                sign In
              </h5>
            </div>
          )}
          <Button text="Sign Up" onClick={() => submitForm} style="sign-in" />
        </div>
      </form>
    </div>
  );
};

import React from 'react';
import classNames from 'classnames';

import { useToast } from 'hooks';
import error from 'assets/error.svg';
import success from 'assets/success.svg';

import './styles.scss';

export const ToastComponent = () => {
  const { isToastVisible, toastType, message } = useToast();
  return (
    <div
      className={classNames('snackbar', {
        snackbar__show: isToastVisible,
        'snackbar__show--success': toastType === 'success',
        'snackbar__show--error': toastType === 'error',
      })}
    >
      <div className="snackbar__content">
        <img className="snackbar__icon" src={toastType === 'success' ? success : error} />
        <p className="snackbar__message">{message}</p>
      </div>
    </div>
  );
};

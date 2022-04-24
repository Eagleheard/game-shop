import React, { useRef } from 'react';
import classNames from 'classnames';

import error from 'assets/error.png';
import success from 'assets/success.png';

import './styles.scss';

const useToast = (message, variant) => {
  const toastRef = useRef(null);
  const openToast = () => {
    toastRef.current.classList.add('snackbar__show');
    setTimeout(() => {
      toastRef.current.classList.remove('snackbar__show');
    }, 3000);
  };

  const ToastComponent = () => (
    <div
      ref={toastRef}
      className={classNames('snackbar', {
        snackbar__success: variant === 'success',
        snackbar__error: variant === 'error',
      })}
    >
      <div className="snackbar__content">
        <img className="snackbar__icon" src={variant == 'success' ? success : error} />
        <p className="snackbar__message">{message}</p>
      </div>
    </div>
  );
  return { openToast, ToastComponent };
};

export default useToast;

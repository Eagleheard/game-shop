import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import error from 'assets/error.png';
import success from 'assets/success.png';

import './styles.scss';

const toastTimeout = 3000;

const useToast = () => {
  const [message, setMessage] = useState('Something wrong');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastType, setToastType] = useState('success');

  const openToast = useCallback((message, toastType) => {
    setMessage(message);
    setToastType(toastType);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, toastTimeout);
  }, []);

  const ToastComponent = () => (
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
  return { openToast, ToastComponent };
};

export default useToast;

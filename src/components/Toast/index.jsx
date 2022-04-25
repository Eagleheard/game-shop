import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import error from 'assets/error.png';
import success from 'assets/success.png';

import './styles.scss';

const useToast = (variant) => {
  const [message, setMessage] = useState('Something wrong');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const openToast = useCallback(() => {
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3000);
  }, [!isToastVisible]);

  const ToastComponent = () => (
    <div
      className={classNames('snackbar', {
        snackbar__show: isToastVisible,
        'snackbar__show--success': variant === 'success',
        'snackbar__show--error': variant === 'error',
      })}
    >
      <div className="snackbar__content">
        <img className="snackbar__icon" src={variant == 'success' ? success : error} />
        <p className="snackbar__message">{message}</p>
      </div>
    </div>
  );
  return { openToast, ToastComponent, setMessage };
};

export default useToast;

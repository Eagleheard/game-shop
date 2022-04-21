import React, { useRef } from 'react';

import error from 'assets/error.png';

import './styles.scss';

const useToast = (message, variant = 'success', style = {}) => {
  const toastRef = useRef(null);
  const openToast = () => {
    toastRef.current.classList.add('snackbar__show');
    setTimeout(() => {
      toastRef.current.classList.remove('snackbar__show');
    }, 2800);
  };
  let toastStyle, icon;
  switch (variant) {
    case 'success':
      toastStyle = {
        backgroundColor: '#adebad',
        borderTop: '5px solid #2db92d',
      };
      icon = <img className="snackbar__icon" src={error} />;
      break;
    case 'error':
      toastStyle = {
        backgroundColor: '#ffcccc',
        borderTop: '5px solid #ff0000',
      };
      icon = <img className="snackbar__icon" src={error} />;
      break;
    case 'info':
      toastStyle = {
        backgroundColor: '#ccf2ff',
        borderTop: '5px solid #33ccff',
      };
      icon = <img className="snackbar__icon" src={error} />;
      break;
    case 'warning':
      toastStyle = {
        backgroundColor: '#fff0b3',
        borderTop: '5px solid #ffcc00',
      };
      icon = <img className="snackbar__icon" src={error} />;
      break;
    default:
      break;
  }
  const ToastComponent = () => (
    <div ref={toastRef} className="snackbar" style={{ ...toastStyle, ...style }}>
      <div className="snackbar__content">
        {icon}
        <p className="snackbar__message">{message}</p>
      </div>
    </div>
  );
  return { openToast, ToastComponent };
};

export default useToast;

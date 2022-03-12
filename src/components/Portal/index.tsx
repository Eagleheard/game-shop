import React from 'react';
import ReactDOM from 'react-dom';

import grey_cross from 'assets/grey-cross.png';

import './styles.scss';
import { ISign } from 'types/interfaces';

interface IPortal {
  Component: React.FC<ISign>;
  isOpen: boolean;
  handleClose: () => void;
  handleSwitch: () => void;
  text: string;
}

export const Portal: React.FC<IPortal> = ({
  Component,
  isOpen,
  text,
  handleClose,
  handleSwitch,
}) => {
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="portal">
      <button className="portal__close-btn" onClick={handleClose}>
        <img src={grey_cross} />
      </button>
      <h2 className="portal__name">{text}</h2>
      <Component handleSwitch={handleSwitch} />
    </div>,
    document.body,
  );
};

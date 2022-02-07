import React from 'react';

import './styles.scss';

interface IButton {
  text: string;
  onClick: () => void;
  style: string;
  disabled: boolean;
}

export const Button: React.FC<IButton> = ({ text, onClick, style, disabled }) => {
  return (
    <button
      onClick={() => onClick()}
      className={`navigation navigation__${style}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

import React from 'react';

import './styles.scss';

interface IButton {
  symbol: string;
  setPage: () => void;
  style: string;
  disabled: boolean;
}

export const Button: React.FC<IButton> = ({ symbol, setPage, style, disabled }) => {
  return (
    <button
      onClick={() => setPage()}
      className={`navigation navigation__${style}`}
      disabled={disabled}
    >
      {symbol}
    </button>
  );
};

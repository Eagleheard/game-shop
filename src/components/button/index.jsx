import React from 'react';

import './styles.scss';

export const Button = ({ symbol, setPage, style, disabled }) => {
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

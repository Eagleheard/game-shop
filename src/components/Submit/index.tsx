import React from 'react';

import './style.scss';

interface ISubmit {
  style: string;
  text: string;
}

export const Submit: React.FC<ISubmit> = ({ style, text }) => {
  return (
    <button type="submit" className={`submit submit__${style}`}>
      {text}
    </button>
  );
};

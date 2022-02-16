import React from 'react';

import { Form } from 'components/Form';

import grey_cross from 'assets/grey-cross.png';

import './responsive-style.scss';

export const ResponsiveFilter = ({ games, fillGames, setIsFilterVisible }) => {
  return (
    <div className="responsive-filter">
      <button className="responsive-filter__close-btn" onClick={() => setIsFilterVisible(false)}>
        <img src={grey_cross} />
      </button>
      <Form games={games} fillGames={fillGames} />
    </div>
  );
};

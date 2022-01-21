import React from 'react';

import './style.scss';

export const Search = () => {
  return (
    <div className="search header-search">
      <input type="search" placeholder="Search game..." className="search__field"></input>
      <button type="submit" className="search__btn">
        Search
      </button>
    </div>
  );
};

import React, { useEffect, useState } from 'react';

import './styles.scss';

const NEW_GAMES = 'New games';
const POPULAR_GAMES = 'Popular games';

export const Select = ({ placeholder, options, setNewGames, setPopularGames }) => {
  const [value, setValue] = useState();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (value === NEW_GAMES) {
      setNewGames();
    }
    if (value === POPULAR_GAMES) {
      setPopularGames();
    }
  }, [value, setNewGames, setPopularGames]);

  return (
    <label className="select">
      <select value={value} onChange={handleChange} className="select__item">
        <option>{placeholder}</option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            disabled={options[index] === index}
            className="select__menu"
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

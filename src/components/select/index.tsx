import React, { useEffect, useState, ChangeEvent, ChangeEventHandler } from 'react';

import './styles.scss';

const OUR_GAMES = 'Our games';
const NEW_GAMES = 'New games';
const POPULAR_GAMES = 'Popular games';

interface ISelect {
  placeholder: string;
  options: {
    id: number;
    value: string;
    label: string;
  }[];
  setNewGames: () => void;
  setPopularGames: () => void;
  fillGames: () => void;
}

export const Select: React.FC<ISelect> = ({
  placeholder,
  options,
  setNewGames,
  setPopularGames,
  fillGames,
}) => {
  const [value, setValue] = useState<string>();

  const handleChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (value === OUR_GAMES) {
      fillGames();
    }

    if (value === NEW_GAMES) {
      setNewGames();
    }
    if (value === POPULAR_GAMES) {
      setPopularGames();
    }
  }, [value, fillGames, setNewGames, setPopularGames]);

  return (
    <label className="select">
      <select value={value} onChange={handleChange} className="select__item">
        <option>{placeholder}</option>
        {options.map(({ id, value, label }) => (
          <option key={id} value={value} className="select__menu">
            {label}
          </option>
        ))}
      </select>
    </label>
  );
};

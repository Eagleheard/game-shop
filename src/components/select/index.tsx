import React, { useState, ChangeEvent, ChangeEventHandler } from 'react';

import './styles.scss';

interface ISelect {
  placeholder: string;
  options: {
    id: number;
    value: string;
    label: string;
  }[];
  handleSelect: (value: string) => void;
}

export const Select: React.FC<ISelect> = ({ placeholder, options, handleSelect }) => {
  const [value, setValue] = useState<string>();

  const handleChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    handleSelect(event.target.value);
  };

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

import React, { useState } from 'react';

import './styles.scss';

interface ISelect {
  placeholder: string;
  options: {
    id: number;
    value: string;
    label: string;
  }[];
  style: string;
  handleSelect: (value: string) => void;
}

export const Select: React.FC<ISelect> = ({ placeholder, options, style, handleSelect }) => {
  const [value, setValue] = useState<string>(placeholder);
  const [isListHidden, setIsListHidden] = useState<boolean>(true);

  const handleChange = (label: string) => {
    setValue(label);
    handleSelect(label);
    setIsListHidden(false);
  };

  return (
    <label
      className={`select ${style}__select`}
      onClick={() => setIsListHidden((prevValue) => !prevValue)}
    >
      {value} ↓
      <div className="select__menu">
        {!isListHidden &&
          options.map(({ id, label }) => (
            <div key={id} className="select__menu-item" onClick={() => handleChange(label)}>
              {label}
            </div>
          ))}
      </div>
    </label>
  );
};

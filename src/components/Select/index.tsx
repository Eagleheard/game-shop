import React, { useRef, useState } from 'react';
import { useClickOutside } from 'hooks';

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
  const [value, setValue] = useState<string>();
  const [isListHidden, setIsListHidden] = useState<boolean>(true);
  const selectRef = useRef(null);
  const outsideClick = () => {
    setIsListHidden(true);
  };

  useClickOutside(selectRef, outsideClick);

  const handleChange = (label: string) => {
    setValue(label);
    handleSelect(label);
    setIsListHidden(true);
  };
  console.log(isListHidden);
  return (
    <label className={`select ${style}__select`}>
      <div
        className="select__input"
        ref={selectRef}
        onClick={() => setIsListHidden((prevValue) => !prevValue)}
      >
        {!value ? (
          <p className={`select__placeholder ${style}__placeholder`}>{placeholder}</p>
        ) : (
          value
        )}
        {isListHidden ? <p>↓</p> : <p>↑</p>}
      </div>
      <div className={`select__menu ${style}__select-menu`}>
        {!isListHidden &&
          options.map(({ id, label }) => (
            <div
              key={id}
              className={`select__menu-item ${style}__select-menu-item`}
              onClick={() => handleChange(label)}
            >
              {label}
            </div>
          ))}
      </div>
    </label>
  );
};

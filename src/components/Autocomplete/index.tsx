import React, { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import './style.scss';

interface IAutocomplete {
  author: string[];
  register: UseFormRegister<FieldValues>;
}

export const Autocomplete: React.FC<IAutocomplete> = ({ author, register }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    const newFilteredSuggestions = author.filter(
      (suggestion, index) =>
        suggestion.toLowerCase().indexOf(input.toLowerCase()) === 0 &&
        index === author.indexOf(suggestion),
    );
    setFiltered(newFilteredSuggestions);
    setIsShow(true);
    setInput(e.currentTarget.value);
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText);
  };

  const renderAutocomplete = () => {
    if (isShow && input) {
      if (filtered.length) {
        return (
          <ul className="autocomplete__list">
            {filtered.map((suggestion) => {
              return (
                <li key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className="autocomplete__error">
            <em>Not found</em>
          </div>
        );
      }
    }
    return <></>;
  };
  return (
    <div className="autocomplete">
      <input
        type="text"
        value={input}
        {...register('author', {
          onChange: onChange,
        })}
        className="autocomplete__input"
        placeholder="Author"
      />
      {renderAutocomplete()}
    </div>
  );
};

import React, { useMemo, useState } from 'react';

import './style.scss';

interface IAutocomplete {
  options: string[];
  name: string;
  onChangeInput: (input: string) => void;
}

export const Autocomplete: React.FC<IAutocomplete> = ({ options, name, onChangeInput }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    const newFilteredSuggestions = options.filter(
      (suggestion, index) =>
        suggestion.toLowerCase().indexOf(input.toLowerCase()) === 0 &&
        index === options.indexOf(suggestion),
    );
    setFiltered(newFilteredSuggestions);
    setIsShow(true);
    setValue(e.currentTarget.value);
    onChangeInput(e.currentTarget.value);
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setFiltered([]);
    setIsShow(false);
    setValue(e.currentTarget.innerText);
  };

  const renderAutocomplete = useMemo(() => {
    if (isShow && value) {
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
      }

      return (
        <ul className="autocomplete__list">
          <li>Not found</li>
        </ul>
      );
    }
    return <></>;
  }, [filtered, isShow, value]);

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={value}
        className="autocomplete__input"
        placeholder={name}
        onChange={onChange}
      />
      {renderAutocomplete}
    </div>
  );
};

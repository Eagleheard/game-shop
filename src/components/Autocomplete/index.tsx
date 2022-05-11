import React, { Children, useCallback, useEffect, useMemo, useState } from 'react';

import { Card } from 'screen';

import './style.scss';

interface IAutocomplete {
  options: string[];
  name: string;
  reset?: string;
  onChangeInput: (input: string) => void;
}

export const Autocomplete: React.FC<IAutocomplete> = ({
  options,
  name,
  onChangeInput,
  reset,
  children,
}) => {
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
  };

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      setFiltered([]);
      setIsShow(false);
      setValue(e.currentTarget.innerText);
      onChangeInput(e.currentTarget.innerText);
    },
    [onChangeInput],
  );

  const onGameClick = useCallback(
    (name: string) => {
      setFiltered([]);
      setIsShow(false);
      setValue(name);
      onChangeInput(name);
      setValue('');
    },
    [onChangeInput],
  );

  useEffect(() => {
    setValue(reset || '');
  }, [reset]);

  const renderAutocomplete = useMemo(() => {
    if (isShow && value) {
      if (filtered.length) {
        return (
          <ul className="autocomplete__list">
            {filtered.map((suggestion) => {
              return children ? (
                <div
                  className="autocomplete__list-item"
                  key={suggestion}
                  onClick={() => onGameClick(suggestion)}
                >
                  {Children.toArray(children).filter(
                    (children: Card) => children.props.name === suggestion,
                  )}
                </div>
              ) : (
                <li className="autocomplete__list-item" key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      }

      return (
        <ul className="autocomplete__list">
          <li className="autocomplete__list-item">Not found</li>
        </ul>
      );
    }
    return <></>;
  }, [filtered, isShow, value, children, onClick, onGameClick]);

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

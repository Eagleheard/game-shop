import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useClickOutside } from 'hooks';

import './style.scss';

interface IAutocomplete {
  options: string[];
  name: string;
  reset?: string;
  style?: string;
  onChangeInput: (input: string) => void;
}

export const Autocomplete: React.FC<IAutocomplete> = ({
  options,
  name,
  onChangeInput,
  reset,
  style,
}) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const autocompleteRef = useRef(null);
  const outsideClick = () => {
    setIsShow(false);
  };

  useClickOutside(autocompleteRef, outsideClick);

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

  useEffect(() => {
    setValue(reset || '');
  }, [reset]);

  const renderAutocomplete = useMemo(() => {
    if (isShow && value) {
      if (filtered.length) {
        return (
          <ul className={`autocomplete__list ${style}-autocomplete__list`}>
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
        <ul className={`autocomplete__list ${style}-autocomplete__list`}>
          <li>Not found</li>
        </ul>
      );
    }
    return <></>;
  }, [filtered, isShow, value, style, onClick]);

  return (
    <div className={`autocomplete ${style}-autocomplete`} ref={autocompleteRef}>
      <input
        type="text"
        value={value}
        className={`autocomplete__input ${style}-autocomplete__input`}
        placeholder={name}
        onChange={onChange}
      />
      {renderAutocomplete}
    </div>
  );
};

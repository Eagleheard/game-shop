import React, { useState } from 'react';
import classNames from 'classnames';

import './style.scss';

export const Autocomplete = ({ author, register }) => {
  const [active, setActive] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [input, setInput] = useState();

  const onChange = (e) => {
    const input = e.currentTarget.value;
    const newFilteredSuggestions = author.filter(
      (suggestion, index) =>
        suggestion.toLowerCase().indexOf(input.toLowerCase()) === 0 &&
        index === author.indexOf(suggestion),
    );
    setActive(0);
    setFiltered(newFilteredSuggestions);
    setIsShow(true);
    setInput(e.currentTarget.value);
  };

  const onClick = (e) => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText);
  };

  const renderAutocomplete = () => {
    if (isShow && input) {
      if (filtered.length) {
        return (
          <ul className="autocomplete__list">
            {filtered.map((suggestion, index) => {
              return (
                <li
                  className={classNames('autocomplete__list-item', {
                    'autocomplete__list-item--active': index === active,
                  })}
                  key={suggestion}
                  onClick={onClick}
                >
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
        onChange={onChange}
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

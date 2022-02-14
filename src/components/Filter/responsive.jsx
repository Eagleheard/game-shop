import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchGameByGenre } from 'api/fetchGameByGenre';

import { Autocomplete, Select, Submit } from 'components';

import './responsive-style.scss';

export const ResponsiveFilter = ({ games, fillGames, setIsFilterVisible }) => {
  const [isDiskChecked, setIsDiskChecked] = useState(false);
  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    console.log(data);
  };

  const handleFilterSelect = async (genre) => {
    const games = await fetchGameByGenre(genre);
    fillGames(games);
  };

  return (
    <div className="responsive-filter">
      <form onSubmit={handleSubmit(submitForm)} className="responsive-filter__form">
        <button className="responsive-filter__close-btn" onClick={() => setIsFilterVisible(false)}>
          ❌
        </button>
        <Autocomplete author={games.map(({ author }) => author)} register={register} />
        <Select
          placeholder="Genre"
          options={[
            { id: 0, label: 'Action', value: 'Action' },
            { id: 1, label: 'RPG', value: 'RPG' },
            { id: 2, label: 'Racing', value: 'Racing' },
            { id: 3, label: 'Adventure', value: 'Adventure' },
          ]}
          style="responsive-filter"
          handleSelect={handleFilterSelect}
        />
        <div className="responsive-filter__digital">
          <label>Digital:</label>
          <input type="checkbox" />
        </div>
        <div className="responsive-filter__disk">
          <label>Disk:</label>
          <input type="checkbox" onClick={() => setIsDiskChecked((prevValue) => !prevValue)} />
        </div>
        {isDiskChecked && (
          <div>
            <input
              placeholder="Number of copies"
              className="responsive-filter__copies"
              type="text"
            />
          </div>
        )}
        <p>Price:</p>
        <div className="responsive-filter__price">
          <input
            {...register('min price')}
            placeholder="min price"
            type="text"
            className="responsive-filter__price-min"
          />
          <input
            {...register('max price')}
            placeholder="max price"
            type="text"
            className="responsive-filter__price-max"
          />
        </div>
        <div className="responsive-filter__buttons">
          <Submit style="search" text="Filter" />
          <Submit style="clear" text="Clear" />
        </div>
      </form>
    </div>
  );
};

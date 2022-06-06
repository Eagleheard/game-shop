import React, { ChangeEvent, useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ToastComponent } from 'components/Toast';
import { ToastOptions } from 'types/enumerators';
import { useToast } from 'hooks';
import { GamesReducerState } from 'toolkitStore/types';

import { addNewGameSaveOptionts, resetGame } from 'toolkitStore/actions/games';
import { addNewGame, updateSelectedGame } from 'toolkitStore/thunk';
import { Autocomplete, Checkbox, Button } from 'components';
import { fetchGenres } from 'api/fetchGenres';
import { uploadGamePhoto } from 'api/adminRequests';
import { fetchAllAuthors } from 'api/fetchAuthor';

import gameBackground from 'assets/gameBackground.png';

import './styles.scss';

interface IGenre {
  id: number;
  name: string;
}

interface IAuthor {
  id: number;
  name: string;
}

interface INewGame {
  handleOpenNewAuthor: () => void;
  createMode: string;
  isEditMode?: boolean;
}

const MAX_DESCRIPTION_COUNT = 300;

export const NewGame: React.FC<INewGame> = ({ handleOpenNewAuthor, createMode, isEditMode }) => {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [isDiskChecked, setIsDiskChecked] = useState(false);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const { newGame, gameError, isLoading } = useSelector(
    (state: GamesReducerState) => state.gamesReducer || [],
  );
  const dispatch = useDispatch();
  const { openToast } = useToast();

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const fillGenres = async () => {
    try {
      const { data } = await fetchGenres();
      setGenres(data);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), ToastOptions.error);
    }
  };

  const fillAuthors = async () => {
    try {
      const { data } = await fetchAllAuthors();
      setAuthors(data);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), ToastOptions.error);
    }
  };

  const uploadNewGamePhoto = async (files: FileList | null) => {
    try {
      const formData = new FormData();
      files ? formData.append('file', files[0]) : undefined;
      formData.append('upload_preset', 'fabra5gx');
      const { data } = await uploadGamePhoto(formData);
      dispatch(addNewGameSaveOptionts({ ...newGame, ['image']: data.url }));
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), ToastOptions.error);
    }
  };

  const uploadNewGamePreviewPhoto = async (files: FileList | null) => {
    try {
      const formData = new FormData();
      files ? formData.append('file', files[0]) : undefined;
      formData.append('upload_preset', 'jumymijs');
      const { data } = await uploadGamePhoto(formData);
      dispatch(addNewGameSaveOptionts({ ...newGame, ['preview']: data.url }));
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), ToastOptions.error);
    }
  };

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    if (!isEditMode) {
      dispatch(addNewGame({ ...data, image: newGame.image, preview: newGame.preview }));
      if (!gameError && !isLoading) {
        openToast('Successfully created', ToastOptions.success);
      }
    }
    if (isEditMode) {
      dispatch(
        updateSelectedGame({
          ...data,
          id: newGame.id,
          image: newGame.image,
          preview: newGame.preview,
        }),
      );
      if (!gameError && !isLoading) {
        openToast('Successfully updated', ToastOptions.success);
      }
    }
    handleReset();
  };

  const handleReset = () => {
    dispatch(resetGame());
    reset();
    setIsDiskChecked(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    dispatch(addNewGameSaveOptionts({ ...newGame, [id]: value }));
  };

  const handleDescriptionCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setDescriptionCount(e.target.value.length);
    dispatch(addNewGameSaveOptionts({ ...newGame, [id]: value }));
  };

  useEffect(() => {
    fillGenres();
    fillAuthors();
  }, []);

  useEffect(() => {
    if (gameError && !isLoading) {
      openToast(gameError, ToastOptions.error);
    }
  }, [gameError]);

  return (
    <div className="new-game">
      <form onSubmit={handleSubmit(submitForm)} className="new-game__form">
        <h1 className="new-game__preview">{createMode}</h1>
        <div className="new-game__info">
          <div className="new-game__image-info">
            <div className="new-game__main-image">
              <img
                className="new-game__image"
                src={newGame.image ? newGame.image : gameBackground}
                alt="profile photo"
              />
              <label className="new-game__upload-label" htmlFor="new-preview-upload">
                Upload game photo
              </label>
              <input
                className="new-game__upload-input"
                id="new-preview-upload"
                type="file"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  uploadNewGamePhoto(event.target.files)
                }
              />
            </div>
            <div className="new-game__preview-image">
              <img
                className="new-game__image"
                src={newGame.preview ? newGame.preview : gameBackground}
                alt="profile photo"
              />
              <label className="new-game__upload-label" htmlFor="file-upload">
                Upload game preview photo
              </label>
              <input
                className="new-game__upload-input"
                id="file-upload"
                type="file"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  uploadNewGamePreviewPhoto(event.target.files)
                }
              />
            </div>
          </div>
          <div className="new-game__name-block">
            <div className="new-game__group">
              <input
                {...register('name', {
                  required: true,
                })}
                type="text"
                id="name"
                defaultValue={newGame.name ?? ''}
                onChange={handleChange}
                placeholder="Name"
                className="new-game__name"
              />
              <label htmlFor="name" className="new-game__label">
                Name
              </label>
              {errors.name && <p className="new-game__errors">Name cannot be empty</p>}
            </div>
            <div className="new-game__group">
              <input
                {...register('price', {
                  required: true,
                })}
                id="price"
                defaultValue={newGame.price ?? ''}
                placeholder="price"
                className="new-game__price"
                onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                onChange={handleChange}
              />
              <label htmlFor="price" className="new-game__label">
                Price
              </label>
              {errors.price && <p className="new-game__errors">Price cannot be empty</p>}
            </div>
          </div>
          <div className="new-game__description-block">
            <div className="new-game__group">
              <textarea
                {...register('description', {
                  required: true,
                })}
                id="description"
                defaultValue={newGame.description ?? ''}
                placeholder="description"
                className="new-game__description"
                onChange={handleDescriptionCount}
                maxLength={MAX_DESCRIPTION_COUNT}
              />
              <label htmlFor="description" className="new-game__label">
                Description
              </label>
              {errors.description && (
                <p className="new-game__errors">Description cannot be empty</p>
              )}
              <p className="new-game__description-count">
                {MAX_DESCRIPTION_COUNT - descriptionCount}
              </p>
            </div>
          </div>
          <div className="new-game__additional-info">
            <Controller
              name="genreName"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue={newGame.genre?.name}
              render={({ field: { onChange } }) => (
                <Autocomplete
                  reset={newGame.genre?.name}
                  options={genres.map(({ name }) => name)}
                  name="Genre"
                  onChangeInput={onChange}
                  style="admin"
                />
              )}
            />
            {errors.genreName && <p className="new-game__errors">Genre cannot be empty</p>}
            <Controller
              name="authorName"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue={newGame.author?.name}
              render={({ field: { onChange } }) => (
                <Autocomplete
                  reset={newGame.author?.name}
                  options={authors.map(({ name }) => name)}
                  name="Author"
                  onChangeInput={onChange}
                  style="admin"
                />
              )}
            />
            <div className="new-game__author-block">
              <p className="new-game__author">Cannot find author?</p>
              <p className="new-game__author--link" onClick={handleOpenNewAuthor}>
                Create him!
              </p>
            </div>
            {errors.authorName && <p className="new-game__errors">Author cannot be empty</p>}
            <Controller
              name="digital"
              defaultValue={newGame.digital ?? false}
              control={control}
              render={({ field: { onChange } }) => (
                <Checkbox value={newGame.digital ?? false} label="Digital" onClick={onChange} />
              )}
            />
            <Controller
              name="disk"
              control={control}
              defaultValue={newGame.disk ?? false}
              render={({ field: { onChange } }) => (
                <Checkbox
                  value={newGame.disk ?? false}
                  label="Disk"
                  onChange={onChange}
                  onClick={() => setIsDiskChecked((prevValue) => !prevValue)}
                />
              )}
            />
            {isDiskChecked ||
              (newGame.disk && (
                <div className="new-game__group">
                  <input
                    {...register('count', {
                      required: true,
                    })}
                    id="count"
                    defaultValue={newGame.count ?? ''}
                    onChange={handleChange}
                    placeholder="Count"
                    className="new-game__count"
                    onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                  />
                  <label htmlFor="count" className="new-game__label">
                    Count
                  </label>
                  {errors.count && <p className="new-game__errors">Count cannot be empty</p>}
                </div>
              ))}
            <div className="new-game__group">
              <input
                {...register('popularity', {
                  required: true,
                })}
                id="popularity"
                defaultValue={newGame.popularity ?? ''}
                onChange={handleChange}
                placeholder="Popularity"
                className="new-game__popularity"
              />
              <label htmlFor="description" className="new-game__label">
                Popularity
              </label>
              {errors.popularity && <p className="new-game__errors">Popularity cannot be empty</p>}
            </div>
            <Controller
              name="isNew"
              defaultValue={newGame.isNew ?? false}
              control={control}
              render={({ field: { onChange } }) => <Checkbox label="is New?" onChange={onChange} />}
            />
            <Controller
              name="isPreview"
              defaultValue={newGame.isPreview ?? false}
              control={control}
              render={({ field: { onChange } }) => (
                <Checkbox label="Will be on preview?" onChange={onChange} />
              )}
            />
          </div>
        </div>
        <div className="new-game__submit">
          <Button style="admin-clear" text="Clear" type="reset" onClick={handleReset} />
          <Button style="admin-search" text={createMode} type="submit" onClick={() => submitForm} />
        </div>
      </form>
      <ToastComponent />
    </div>
  );
};

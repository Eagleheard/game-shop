import React, { ChangeEvent, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { AuthorsReducerState } from 'toolkitStore/types';
import { addNewAuthor } from 'toolkitStore/thunk';
import { ToastOptions } from 'types/enumerators';
import { useToast } from 'hooks';
import { uploadGamePhoto } from 'api/adminRequests';
import { Button, ToastComponent } from 'components';

import userPhoto from 'assets/userPhoto.png';

import './styles.scss';

const MAX_DESCRIPTION_COUNT = 300;

export const NewAuthor: React.FC = () => {
  const [authorPhoto, setAuthorPhoto] = useState<string>();
  const [descriptionCount, setDescriptionCount] = useState(0);
  const dispatch = useDispatch();
  const { openToast } = useToast();
  const { authorError, isLoading } = useSelector(
    (state: AuthorsReducerState) => state.authorsReducer || [],
  );

  const { handleSubmit, register, reset } = useForm();

  const uploadNewAuthorPhoto = async (files: FileList | null) => {
    try {
      const formData = new FormData();
      files ? formData.append('file', files[0]) : undefined;
      formData.append('upload_preset', 'fabra5gx');
      const { data } = await uploadGamePhoto(formData);
      setAuthorPhoto(data.url);
      openToast('Successfully added', ToastOptions.success);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), ToastOptions.error);
    }
  };

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    dispatch(addNewAuthor({ ...data, image: authorPhoto }));
    if (!authorError && !isLoading) {
      openToast('Successfully created', ToastOptions.success);
    }
    handleReset();
  };

  const handleReset = () => {
    reset();
    setAuthorPhoto('');
  };

  useEffect(() => {
    if (authorError && !isLoading) {
      openToast(authorError, ToastOptions.error);
    }
  }, [authorError]);

  return (
    <div className="new-author">
      <form onSubmit={handleSubmit(submitForm)} className="new-author__form">
        <h1>New author</h1>
        <div className="new-author__image-info">
          <img
            className="new-author__image"
            src={authorPhoto ? authorPhoto : userPhoto}
            alt="profile photo"
          />
          <label className="new-author__upload-label" htmlFor="file-upload">
            Upload new photo
          </label>
        </div>
        <div className="new-author__main-info">
          <input
            className="new-author__upload-input"
            id="file-upload"
            type="file"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              uploadNewAuthorPhoto(event.target.files)
            }
          />
          <div className="new-author__group">
            <input
              {...register('name', {
                required: true,
              })}
              type="text"
              id="name"
              placeholder="Name"
              className="new-author__name"
            />
            <label htmlFor="name" className="new-author__label">
              Name
            </label>
          </div>
          <div className="new-author__group">
            <input
              {...register('location', {
                required: true,
              })}
              type="text"
              id="location"
              placeholder="Location"
              className="new-author__location"
            />
            <label htmlFor="location" className="new-author__label">
              Location
            </label>
          </div>
          <div className="new-author__group">
            <input
              {...register('popularity', {
                required: true,
              })}
              type="text"
              id="popularity"
              placeholder="Popularity"
              className="new-author__location"
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
            />
            <label htmlFor="Popularity" className="new-author__label">
              Popularity
            </label>
          </div>
          <div className="new-author__group">
            <textarea
              {...register('description')}
              id="description"
              placeholder="description"
              className="new-author__description"
              onChange={(e) => setDescriptionCount(e.target.value.length)}
              maxLength={MAX_DESCRIPTION_COUNT}
            />
            <label htmlFor="description" className="new-author__label">
              Description
            </label>
            <p className="new-game__description-count">
              {MAX_DESCRIPTION_COUNT - descriptionCount}
            </p>
          </div>
        </div>
        <div className="new-author__additional-info"></div>
        <div className="new-author__submit">
          <Button style="admin-clear" text="Clear" type="reset" onClick={handleReset} />
          <Button style="admin-search" text="Add game" type="submit" onClick={() => submitForm} />
        </div>
      </form>
      <ToastComponent />
    </div>
  );
};

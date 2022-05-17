import React, { ChangeEvent, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { uploadGamePhoto } from 'api/adminRequests';
import { Button } from 'components/Button';
import { addNewAuthor } from 'toolkitStore/thunk';

import userPhoto from 'assets/userPhoto.png';

import './styles.scss';

const maxDescriptionCount = 300;

export const NewAuthor: React.FC = () => {
  const [authorPhoto, setAuthorPhoto] = useState<string>();
  const [descriptionCount, setDescriptionCount] = useState(0);
  const dispatch = useDispatch();

  const { handleSubmit, register, reset } = useForm();

  const uploadNewAuthorPhoto = async (files: FileList | null) => {
    try {
      const formData = new FormData();
      files ? formData.append('file', files[0]) : undefined;
      formData.append('upload_preset', 'fabra5gx');
      const { data } = await uploadGamePhoto(formData);
      setAuthorPhoto(data.url);
    } catch (e) {
      console.log(e);
    }
  };

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    dispatch(addNewAuthor({ ...data, image: authorPhoto }));
    handleReset();
  };

  const handleReset = () => {
    reset();
    setAuthorPhoto('');
  };

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
              maxLength={maxDescriptionCount}
            />
            <label htmlFor="description" className="new-author__label">
              Description
            </label>
            <p className="new-game__description-count">{maxDescriptionCount - descriptionCount}</p>
          </div>
        </div>
        <div className="new-author__additional-info"></div>
        <div className="new-author__submit">
          <Button style="admin-clear" text="Clear" type="reset" onClick={handleReset} />
          <Button style="admin-search" text="Add game" type="submit" onClick={() => submitForm} />
        </div>
      </form>
    </div>
  );
};

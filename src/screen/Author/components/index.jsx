import React from 'react';
import { useParams } from 'react-router-dom';

import { Preview } from 'components';

export const Author = () => {
  const { author } = useParams();
  return (
    <div className="author">
      <Preview />
      {author}
    </div>
  );
};

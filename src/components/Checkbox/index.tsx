import React from 'react';

import './style.scss';

interface ICheckbox {
  label: string;
  onClick?: () => void;
  onChange?: () => void;
}

export const Checkbox: React.FC<ICheckbox> = ({ label, onClick, onChange }) => {
  return (
    <div className="checkbox">
      <input type="checkbox" onClick={onClick} onChange={onChange} />
      <label className="checkbox__label">{label}</label>
    </div>
  );
};

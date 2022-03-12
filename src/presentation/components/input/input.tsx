import React from 'react';
import Styles from './input-styles.scss';

export type InputProps = {
  placeholder?: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
};

export const Input: React.FC<InputProps> = ({ type, placeholder, name }) => {
  return (
    <div className={Styles.inputWrap}>
      <input type={type} name={name} placeholder={placeholder} />
      <span className={Styles.status}>🔴</span>
    </div>
  );
};

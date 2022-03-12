import React from 'react';
import Styles from './input-styles.scss';

export type InputProps = {
  placeholder?: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  ...rest
}) => {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  return (
    <div className={Styles.inputWrap}>
      <input
        {...rest}
        type={type}
        name={name}
        placeholder={placeholder}
        readOnly
        onFocus={enableInput}
      />
      <span className={Styles.status}>🔴</span>
    </div>
  );
};

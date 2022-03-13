import React from 'react';
import Styles from './input-styles.scss';

export type InputProps = {
  placeholder?: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  errorMessage?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  errorMessage,
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
      <span
        data-testid={`${name}-status`}
        title={errorMessage}
        className={Styles.status}>
        {errorMessage && '🔴'}
      </span>
    </div>
  );
};

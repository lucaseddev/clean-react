import React from 'react';
import Styles from './button-styles.scss';

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button {...rest} className={Styles.button}>
      {children}
    </button>
  );
};

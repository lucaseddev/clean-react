import { FormContext } from '@/presentation/contexts';
import React, { useContext } from 'react';
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
  const { state, setState } = useContext(FormContext);
  const value = state[name];

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const getStatus = (): string => {
    return errorMessage ? '🔴' : '🟢';
  };

  const getTooltip = (): string => {
    return errorMessage || 'Tudo certo!';
  };

  return (
    <div className={Styles.inputWrap}>
      <input
        data-testid={name}
        {...rest}
        type={type}
        name={name}
        placeholder={placeholder}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
        value={value}
      />
      <span
        data-testid={`${name}-status`}
        title={getTooltip()}
        className={Styles.status}>
        {getStatus()}
      </span>
    </div>
  );
};

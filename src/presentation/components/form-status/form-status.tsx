import React, { useContext } from 'react';

import { Spinner } from '@/presentation/components';
import Styles from './form-status-styles.scss';
import { FormContext } from '@/presentation/contexts';

export type FormStatusProps = unknown;

export const FormStatus: React.FC<FormStatusProps> = () => {
  const { state } = useContext(FormContext);
  const { isLoading, errorMessage } = state;

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && (
        <Spinner data-testid="form-spinner" className={Styles.spinner} />
      )}
      {errorMessage && (
        <span data-testid="main-error" className={Styles.error}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

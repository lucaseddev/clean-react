import React from 'react';

import { Spinner } from '@/presentation/components';
import Styles from './form-status-styles.scss';

export type FormStatusProps = {
  errorMessage: string;
};

export const FormStatus: React.FC<FormStatusProps> = ({ errorMessage }) => {
  return (
    <div className={Styles.errorWrap}>
      <Spinner className={Styles.spinner} />
      <span className={Styles.error}>{errorMessage}</span>
    </div>
  );
};

import React from 'react';
import Styles from './login-header-styles.scss';
import { Logo } from '..';

export const LoginHeader: React.ExoticComponent = React.memo(() => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para programadores.</h1>
    </header>
  );
});

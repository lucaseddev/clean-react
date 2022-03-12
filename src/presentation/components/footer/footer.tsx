import React from 'react';
import Styles from './footer-styles.scss';

export const Footer: React.ExoticComponent = React.memo(() => {
  return <footer className={Styles.footer} />;
});

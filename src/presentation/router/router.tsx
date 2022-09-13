import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '@/presentation/styles/global.scss';

type TFactory = {
  makeLogin: React.FC;
  makeSignup: React.FC;
};

export const Router: React.FC<TFactory> = (factory) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login" element={<factory.makeLogin />} />
          <Route path="signup" element={<factory.makeSignup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '@/presentation/styles/global.scss';

type TProps = {
  makeLogin: React.FC;
};

export const Router: React.FC<TProps> = ({ makeLogin: MakeLogin }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login" element={<MakeLogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

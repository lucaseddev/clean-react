import React from 'react';
import { Login } from '@/presentation/pages';
import { makeLoginValidation } from './login-validation-factory';
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication';
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token';

export const makeLogin: React.FC = () => (
  <Login
    authentication={makeRemoteAuthentication()}
    validation={makeLoginValidation()}
    saveAccessToken={makeLocalSaveAccessToken()}
  />
);

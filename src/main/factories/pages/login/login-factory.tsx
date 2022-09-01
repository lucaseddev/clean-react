import React from 'react';
import { Login } from '@/presentation/pages';
import { makeRemoteAuthentication } from '../../usecases/authentication/remove-authentication-factory';
import { makeLoginValidation } from './login-validation-factory';

export const makeLogin: React.FC = () => (
  <Login
    authentication={makeRemoteAuthentication()}
    validation={makeLoginValidation()}
  />
);

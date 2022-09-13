import React from 'react';
import { SignUp } from '@/presentation/pages';
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token';
import { makeSignUpValidation } from './signup-validation-factory';
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account';

export const makeSignup: React.FC = () => (
  <SignUp
    saveAccessToken={makeLocalSaveAccessToken()}
    validation={makeSignUpValidation()}
    addAccount={makeRemoteAddAccount()}
  />
);

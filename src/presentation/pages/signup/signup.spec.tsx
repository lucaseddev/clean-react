import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { SignUp } from './signup';
import { FormHelper } from '@/presentation/test';

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<SignUp />);

  return { sut };
};

describe('SignUp Page', () => {
  it('Should start with all fields required', () => {
    const validationError = 'Campo obrigatório';
    const { sut } = makeSut();

    FormHelper.testChildCount(sut, 'error-wrap', 0);
    FormHelper.testButtonIsDisabled(sut, 'submit', true);
    FormHelper.testStatusForField(sut, 'name', validationError);
    FormHelper.testStatusForField(sut, 'email', validationError);
    FormHelper.testStatusForField(sut, 'password', validationError);
    FormHelper.testStatusForField(sut, 'passwordConfirmation', validationError);
  });
});

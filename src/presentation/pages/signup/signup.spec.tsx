import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { SignUp } from './signup';
import { FormHelper, ValidationStub } from '@/presentation/test';
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;

  const sut = render(<SignUp validation={validationStub} />);

  return { sut };
};

describe('SignUp Page', () => {
  afterEach(cleanup);

  it('Should start with all fields required', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    FormHelper.testChildCount(sut, 'error-wrap', 0);
    FormHelper.testButtonIsDisabled(sut, 'submit', true);
    FormHelper.testStatusForField(sut, 'name', validationError);
    FormHelper.testStatusForField(sut, 'email', 'Campo obrigatório');
    FormHelper.testStatusForField(sut, 'password', 'Campo obrigatório');
    FormHelper.testStatusForField(
      sut,
      'passwordConfirmation',
      'Campo obrigatório'
    );
  });

  it('Should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    FormHelper.populateField(sut, 'name');

    FormHelper.testStatusForField(sut, 'name', validationError);
  });
});

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
    FormHelper.testStatusForField(sut, 'email', validationError);
    FormHelper.testStatusForField(sut, 'password', validationError);
    FormHelper.testStatusForField(sut, 'passwordConfirmation', validationError);
  });

  it('Should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    FormHelper.populateField(sut, 'name');

    FormHelper.testStatusForField(sut, 'name', validationError);
  });

  it('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    FormHelper.populateField(sut, 'email');

    FormHelper.testStatusForField(sut, 'email', validationError);
  });

  it('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    FormHelper.populateField(sut, 'password');

    FormHelper.testStatusForField(sut, 'password', validationError);
  });

  it('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    FormHelper.populateField(sut, 'passwordConfirmation');

    FormHelper.testStatusForField(sut, 'passwordConfirmation', validationError);
  });

  it('Should show valid name state if validation succeeds', () => {
    const { sut } = makeSut();

    FormHelper.populateField(sut, 'name');

    FormHelper.testStatusForField(sut, 'name');
  });

  it('Should show valid email state if validation succeeds', () => {
    const { sut } = makeSut();

    FormHelper.populateField(sut, 'email');

    FormHelper.testStatusForField(sut, 'email');
  });

  it('Should show valid password state if validation succeeds', () => {
    const { sut } = makeSut();

    FormHelper.populateField(sut, 'password');

    FormHelper.testStatusForField(sut, 'password');
  });

  it('Should show valid passwordConfirmation state if validation succeeds', () => {
    const { sut } = makeSut();

    FormHelper.populateField(sut, 'passwordConfirmation');

    FormHelper.testStatusForField(sut, 'passwordConfirmation');
  });

  it('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();

    FormHelper.populateField(sut, 'name');
    FormHelper.populateField(sut, 'email');
    FormHelper.populateField(sut, 'password');
    FormHelper.populateField(sut, 'passwordConfirmation');

    FormHelper.testButtonIsDisabled(sut, 'submit', false);
  });
});

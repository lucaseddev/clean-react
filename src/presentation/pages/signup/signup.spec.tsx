import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { SignUp } from './signup';
import { AddAccountSpy, FormHelper, ValidationStub } from '@/presentation/test';
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RenderResult;
  addAccountSpy: AddAccountSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;

  const addAccountSpy = new AddAccountSpy();

  const sut = render(
    <SignUp validation={validationStub} addAccount={addAccountSpy} />
  );

  return { sut, addAccountSpy };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  name: string = faker.name.firstName(),
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): Promise<void> => {
  FormHelper.populateField(sut, 'name', name);
  FormHelper.populateField(sut, 'email', email);
  FormHelper.populateField(sut, 'password', password);
  FormHelper.populateField(sut, 'passwordConfirmation', password);

  const form = await sut.findByTestId('signup-form');
  fireEvent.submit(form);

  await waitFor(() => form);
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

  it('Should show loading indicator on submit', async () => {
    const { sut } = makeSut();

    await simulateValidSubmit(sut);

    FormHelper.testElementIsVisible(sut, 'form-spinner');
  });

  it('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut();

    const name = faker.internet.email();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(sut, name, email, password);

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  it('Should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut();

    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);

    expect(addAccountSpy.callsCount).toBe(1);
  });

  it('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words();
    const { sut, addAccountSpy } = makeSut({ validationError });

    await simulateValidSubmit(sut);

    fireEvent.submit(sut.getByTestId('signup-form'));

    expect(addAccountSpy.callsCount).toBe(0);
  });
});

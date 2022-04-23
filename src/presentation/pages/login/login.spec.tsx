import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import 'jest-localstorage-mock';
import faker from '@faker-js/faker';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { Login } from './login';
import { AuthenticationSpy, ValidationStub } from '@/presentation/test';
import { InvalidCredentialsError } from '@/domain/errors';

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory();

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;

  const sut = render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
  );

  return { sut, authenticationSpy };
};

const simulateValidSubmit = (
  sut: RenderResult,
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): void => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const submitButton = sut.getByTestId('submit');
  submitButton.click();
};

const populateEmailField = (
  sut: RenderResult,
  email: string = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email');
  fireEvent.input(emailInput, {
    target: { value: email },
  });
};

const populatePasswordField = (
  sut: RenderResult,
  password: string = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password');
  fireEvent.input(passwordInput, {
    target: { value: password },
  });
};

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`);
  expect(emailStatus.title).toBe(validationError || 'Tudo certo!');
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

describe('Login Page', () => {
  afterEach(cleanup);

  beforeEach(() => {
    localStorage.clear();
  });

  it('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    simulateStatusForField(sut, 'email', validationError);
    simulateStatusForField(sut, 'password', validationError);
  });

  it('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populateEmailField(sut);

    simulateStatusForField(sut, 'email', validationError);
  });

  it('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populatePasswordField(sut);

    simulateStatusForField(sut, 'password', validationError);
  });

  it('Should show valid email state if validation succeeds', () => {
    const { sut } = makeSut();

    populateEmailField(sut);

    simulateStatusForField(sut, 'email');
  });

  it('Should show valid password state if validation succeeds', () => {
    const { sut } = makeSut();

    populatePasswordField(sut);
    simulateStatusForField(sut, 'password');
  });

  it('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();

    populateEmailField(sut);
    populatePasswordField(sut);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  it('Should show loading indicator on submit', () => {
    const { sut } = makeSut();

    simulateValidSubmit(sut);

    const spinner = sut.getByTestId('form-spinner');
    expect(spinner).toBeVisible();
  });

  it('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();

    simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  it('Should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut();

    simulateValidSubmit(sut);
    simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });

    populateEmailField(sut);

    fireEvent.submit(sut.getByTestId('login-form'));

    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('Should present error if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();

    const error = new InvalidCredentialsError();

    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));

    simulateValidSubmit(sut);

    const mainError = await waitFor(() => sut.getByTestId('main-error'));

    expect(mainError.textContent).toEqual(error.message);

    const errorWrap = sut.getByTestId('error-wrap');

    expect(errorWrap.childElementCount).toBe(1);
  });

  it('Should add accessToken to localstorage on auth success', async () => {
    const { sut, authenticationSpy } = makeSut();

    simulateValidSubmit(sut);

    await waitFor(() => sut.getByTestId('login-form'));

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken
    );
  });

  it('Should go to signup page', () => {
    const { sut } = makeSut();
    const signup = sut.getByTestId('signup');

    fireEvent.click(signup);

    expect(history.index).toBe(1);
    expect(history.location.pathname).toBe('/signup');
  });
});

import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import 'jest-localstorage-mock';
import { faker } from '@faker-js/faker';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { Login } from '@/presentation/pages';
import {
  AuthenticationSpy,
  SaveAccessTokenMock,
  ValidationStub,
  FormHelper,
} from '@/presentation/test';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { act } from 'react-dom/test-utils';

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;

  const saveAccessTokenMock = new SaveAccessTokenMock();

  const sut = render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  );

  return { sut, authenticationSpy, saveAccessTokenMock };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): Promise<void> => {
  FormHelper.populateField(sut, 'email', email);
  FormHelper.populateField(sut, 'password', password);

  const form = await sut.findByTestId('login-form');
  fireEvent.submit(form);

  await waitFor(() => form);
};

describe('Login Page', () => {
  afterEach(cleanup);

  it('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    FormHelper.testChildCount(sut, 'error-wrap', 0);
    FormHelper.testButtonIsDisabled(sut, 'submit', true);
    FormHelper.testStatusForField(sut, 'email', validationError);
    FormHelper.testStatusForField(sut, 'password', validationError);
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

  it('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();

    FormHelper.populateField(sut, 'email');
    FormHelper.populateField(sut, 'password');

    FormHelper.testButtonIsDisabled(sut, 'submit', false);
  });

  it('Should show loading indicator on submit', async () => {
    const { sut } = makeSut();

    await simulateValidSubmit(sut);

    const spinner = sut.getByTestId('form-spinner');
    expect(spinner).toBeVisible();
  });

  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  it('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut();

    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });

    await simulateValidSubmit(sut);

    fireEvent.submit(sut.getByTestId('login-form'));

    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('Should present error if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();

    const error = new InvalidCredentialsError();

    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));

    await act(async () => {
      await simulateValidSubmit(sut);
    });

    const mainError = await sut.findByTestId('main-error');
    expect(mainError.textContent).toEqual(error.message);

    FormHelper.testChildCount(sut, 'error-wrap', 1);
  });

  it('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();

    await simulateValidSubmit(sut);

    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken
    );

    expect(history.index).toBe(0);
    expect(history.location.pathname).toBe('/');
  });

  it('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut();

    const error = new UnexpectedError();

    jest
      .spyOn(saveAccessTokenMock, 'save')
      .mockReturnValueOnce(Promise.reject(error));

    await act(async () => {
      await simulateValidSubmit(sut);
    });

    const mainError = await sut.findByTestId('main-error');
    expect(mainError.textContent).toEqual(error.message);

    FormHelper.testChildCount(sut, 'error-wrap', 1);
  });

  it('Should go to signup page', () => {
    const { sut } = makeSut();
    const signup = sut.getByTestId('signup');

    fireEvent.click(signup);

    expect(history.index).toBe(1);
    expect(history.location.pathname).toBe('/signup');
  });
});

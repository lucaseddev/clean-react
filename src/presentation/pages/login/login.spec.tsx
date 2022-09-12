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
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const form = await sut.findByTestId('login-form');
  fireEvent.submit(form);

  await waitFor(() => form);
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

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`);
  expect(emailStatus.title).toBe(validationError || 'Tudo certo!');
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
  const errorWrap = sut.getByTestId('error-wrap');
  expect(errorWrap.childElementCount).toBe(count);
};

const testButtonIsDisabled = (sut: RenderResult, testId: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(testId) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
}

describe('Login Page', () => {
  afterEach(cleanup);

  it('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    testErrorWrapChildCount(sut, 0);
    testButtonIsDisabled(sut, 'submit', true);
    testStatusForField(sut, 'email', validationError);
    testStatusForField(sut, 'password', validationError);
  });

  it('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populateEmailField(sut);

    testStatusForField(sut, 'email', validationError);
  });

  it('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populatePasswordField(sut);

    testStatusForField(sut, 'password', validationError);
  });

  it('Should show valid email state if validation succeeds', () => {
    const { sut } = makeSut();

    populateEmailField(sut);

    testStatusForField(sut, 'email');
  });

  it('Should show valid password state if validation succeeds', () => {
    const { sut } = makeSut();

    populatePasswordField(sut);
    testStatusForField(sut, 'password');
  });

  it('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();

    populateEmailField(sut);
    populatePasswordField(sut);
    testButtonIsDisabled(sut, 'submit', false);
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

    testErrorWrapChildCount(sut, 1);
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
    const { sut, saveAccessTokenMock} = makeSut();

    const error = new UnexpectedError();

    jest
      .spyOn(saveAccessTokenMock, 'save')
      .mockReturnValueOnce(Promise.reject(error));

    await act(async () => {
      await simulateValidSubmit(sut);
    });

    const mainError = await sut.findByTestId('main-error');
    expect(mainError.textContent).toEqual(error.message);

    testErrorWrapChildCount(sut, 1);
  });

  it('Should go to signup page', () => {
    const { sut } = makeSut();
    const signup = sut.getByTestId('signup');

    fireEvent.click(signup);

    expect(history.index).toBe(1);
    expect(history.location.pathname).toBe('/signup');
  });
});

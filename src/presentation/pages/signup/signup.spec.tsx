import React from 'react';
import { faker } from '@faker-js/faker';
import { render, RenderResult } from '@testing-library/react';
import { SignUp } from './signup';

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<SignUp />);

  return { sut };
};

const testChildCount = (
  sut: RenderResult,
  testId: string,
  count: number
): void => {
  const el = sut.getByTestId(testId);
  expect(el.childElementCount).toBe(count);
};

const testButtonIsDisabled = (
  sut: RenderResult,
  testId: string,
  isDisabled: boolean
): void => {
  const button = sut.getByTestId(testId) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
};

const testStatusForField = (
  sut: RenderResult,
  testId: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${testId}-status`);
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

describe('SignUp Page', () => {
  it('Should start with all fields required', () => {
    const validationError = 'Campo obrigatório';
    const { sut } = makeSut();

    testChildCount(sut, 'error-wrap', 0);
    testButtonIsDisabled(sut, 'submit', true);
    testStatusForField(sut, 'name', validationError);
    testStatusForField(sut, 'email', validationError);
    testStatusForField(sut, 'password', validationError);
    testStatusForField(sut, 'passwordConfirmation', validationError);
  });
});

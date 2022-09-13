import { faker } from '@faker-js/faker';
import { fireEvent, RenderResult } from '@testing-library/react';

export const testChildCount = (
  sut: RenderResult,
  testId: string,
  count: number
): void => {
  const el = sut.getByTestId(testId);
  expect(el.childElementCount).toBe(count);
};

export const testButtonIsDisabled = (
  sut: RenderResult,
  testId: string,
  isDisabled: boolean
): void => {
  const button = sut.getByTestId(testId) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
};

export const testStatusForField = (
  sut: RenderResult,
  testId: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${testId}-status`);
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

export const populateField = (
  sut: RenderResult,
  testId: string,
  value: string = faker.random.word()
): void => {
  const input = sut.getByTestId(testId);
  fireEvent.input(input, {
    target: { value },
  });
};

export const testElementIsVisible = (sut: RenderResult, testId: string): void => {
  const el = sut.getByTestId(testId);
  expect(el).toBeVisible();
};
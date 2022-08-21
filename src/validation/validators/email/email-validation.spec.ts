import faker from '@faker-js/faker';

import { InvalidFieldError } from '@/validation/errors';
import { EmailValidation } from './email-validation';

const makeSut = (): EmailValidation =>
  new EmailValidation(faker.database.column());

describe('Email Validation', () => {
  it('Should return error if email is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.word());

    expect(error).toEqual(new InvalidFieldError(sut.field));
  });

  it('Should return falsy if email is valid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.internet.email());

    expect(error).toBeFalsy();
  });
});

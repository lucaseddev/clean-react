import { InvalidFieldError } from '@/validation/errors';
import faker from '@faker-js/faker';
import { MinLengthValidation } from './min-length-validation';

const makeSut = (minLength: number): MinLengthValidation =>
  new MinLengthValidation(faker.database.column(), minLength);

describe('Min Length Validation', () => {
  it('Should return error if value is invalid', () => {
    const sut = makeSut(5);

    const error = sut.validate(faker.random.alphaNumeric(4));

    expect(error).toEqual(new InvalidFieldError(sut.field));
  });

  it('Should return null if value has valid length', () => {
    const sut = makeSut(5);

    const error = sut.validate(faker.random.alphaNumeric(5));

    expect(error).toBeFalsy();
  });
});

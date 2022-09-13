import { InvalidFieldError } from '@/validation/errors';
import { faker } from '@faker-js/faker';
import { MinLengthValidation } from './min-length-validation';

const makeSut = (field: string, minLength: number): MinLengthValidation =>
  new MinLengthValidation(field, minLength);

describe('Min Length Validation', () => {
  it('Should return error if value is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field, 5);

    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) });

    expect(error).toEqual(new InvalidFieldError(sut.field));
  });

  it('Should return null if value has valid length', () => {
    const field = faker.database.column();
    const sut = makeSut(field, 5);

    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) });

    expect(error).toBeFalsy();
  });

  it('Should return null if value does not exist on schema', () => {
    const sut = makeSut(faker.database.column(), 5);

    const error = sut.validate({
      [faker.database.column()]: faker.random.alphaNumeric(5),
    });

    expect(error).toBeFalsy();
  });
});

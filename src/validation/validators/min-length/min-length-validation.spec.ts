import { InvalidFieldError } from '@/validation/errors';
import faker from '@faker-js/faker';
import { MinLengthValidation } from './min-length-validation';

describe('Min Length Validation', () => {
  it('Should return error if value is invalid', () => {
    const sut = new MinLengthValidation(faker.database.column(), 5);

    const error = sut.validate('123');

    expect(error).toEqual(new InvalidFieldError(sut.field));
  });

  it('Should return null if value has valid length', () => {
    const sut = new MinLengthValidation(faker.database.column(), 5);

    const error = sut.validate('123456');

    expect(error).toBeFalsy();
  });
});

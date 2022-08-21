import { RequiredFieldError } from '@/validation/errors';
import faker from '@faker-js/faker';
import { RequiredFieldValidation } from './required-field-validation';

describe('Required Field Validation', () => {
  it('Should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email');
    const error = sut.validate('');

    expect(error).toEqual(new RequiredFieldError());
  });

  it('Should return falsy if field is not empty', () => {
    const sut = new RequiredFieldValidation('email');
    const error = sut.validate(faker.random.word());

    expect(error).toBeFalsy();
  });
});

import { RequiredFieldError } from '@/validation/errors';
import faker from '@faker-js/faker';
import { RequiredFieldValidation } from './required-field-validation';

const makeSut = (): RequiredFieldValidation =>
  new RequiredFieldValidation(faker.database.column());

describe('Required Field Validation', () => {
  it('Should return error if field is empty', () => {
    const sut = makeSut();
    const error = sut.validate('');

    expect(error).toEqual(new RequiredFieldError());
  });

  it('Should return falsy if field is not empty', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.word());

    expect(error).toBeFalsy();
  });
});

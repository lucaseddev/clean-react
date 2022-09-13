import { RequiredFieldError } from '@/validation/errors';
import { faker } from '@faker-js/faker';
import { RequiredFieldValidation } from './required-field-validation';

const makeSut = (field: string): RequiredFieldValidation =>
  new RequiredFieldValidation(field);

describe('Required Field Validation', () => {
  it('Should return error if field is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: '' });

    expect(error).toEqual(new RequiredFieldError());
  });

  it('Should return falsy if field is not empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.word() });

    expect(error).toBeFalsy();
  });
});

import { faker } from '@faker-js/faker';
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  CompareFieldsValidation
} from '@/validation/validators';
import { ValidationBuilder } from './validation-builder';

describe('ValidationBuilder', () => {
  it('Should return RequiredFieldValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).required().build();

    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  it('Should return EmailValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).email().build();

    expect(validations).toEqual([new EmailValidation(field)]);
  });

  it('Should return MinLengthValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).min(5).build();

    expect(validations).toEqual([new MinLengthValidation(field, 5)]);
  });

  it('Should return CompareFieldsValidation', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const validations = ValidationBuilder.field(field).compare(fieldToCompare).build();

    expect(validations).toEqual([new CompareFieldsValidation(field, fieldToCompare)]);
  });

  it('Should return a list of Validations', () => {
    const field = faker.database.column();
    const minLength = faker.datatype.number();
    const validations = ValidationBuilder.field(field)
      .required()
      .min(minLength)
      .email()
      .build();

    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, minLength),
      new EmailValidation(field),
    ]);
  });
});

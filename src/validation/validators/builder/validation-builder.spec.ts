import { faker } from '@faker-js/faker';
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
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

  it('Should return EmailValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).min(5).build();

    expect(validations).toEqual([new MinLengthValidation(field, 5)]);
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

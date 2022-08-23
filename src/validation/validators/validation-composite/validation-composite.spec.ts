import faker from '@faker-js/faker';
import { ValidationSpy } from '../test/mock-field-validation';
import { ValidationComposite } from './validation-composite';

type TSutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: ValidationSpy[];
};

const makeSut = (field: string): TSutTypes => {
  const fieldValidationsSpy = [
    new ValidationSpy(field),
    new ValidationSpy(field),
  ];

  const sut = new ValidationComposite(fieldValidationsSpy);

  return {
    sut,
    fieldValidationsSpy,
  };
};

describe('ValidationComposite', () => {
  it('Should return error if any validation fails', () => {
    const field = faker.database.column();

    const { sut, fieldValidationsSpy } = makeSut(field);

    const errorMsg = faker.random.word();
    fieldValidationsSpy[1].error = new Error(errorMsg);
    
    const error = sut.validate(field, faker.random.word());

    expect(error).toBe(errorMsg);
  });

  it('Should return first validation error that fails', () => {
    const field = faker.database.column();

    const { sut, fieldValidationsSpy } = makeSut(field);

    const errorMsg1 = faker.random.word();
    const errorMsg2 = faker.random.word();
    fieldValidationsSpy[0].error = new Error(errorMsg1);
    fieldValidationsSpy[1].error = new Error(errorMsg2);

    const error = sut.validate(field, faker.random.word());

    expect(error).toBe(errorMsg1);
  });
});

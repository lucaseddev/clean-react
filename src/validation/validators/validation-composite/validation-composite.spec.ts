import { faker } from '@faker-js/faker';
import { ValidationSpy } from '@/validation/test';
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

  const sut = ValidationComposite.build(fieldValidationsSpy);

  return {
    sut,
    fieldValidationsSpy,
  };
};

describe('ValidationComposite', () => {
  it('Should return error if any validation fails', () => {
    const field = faker.database.column();

    const { sut, fieldValidationsSpy } = makeSut(field);

    const errorMsg = faker.random.words();
    fieldValidationsSpy[1].error = new Error(errorMsg);

    const error = sut.validate(field, { [field]: faker.random.word() });

    expect(error).toBe(errorMsg);
  });

  it('Should return first validation error that fails', () => {
    const field = faker.database.column();

    const { sut, fieldValidationsSpy } = makeSut(field);

    const errorMsg1 = faker.random.words();
    fieldValidationsSpy[0].error = new Error(errorMsg1);
    fieldValidationsSpy[1].error = new Error(faker.random.words());

    const error = sut.validate(field, { [field]: faker.random.word() });

    expect(error).toBe(errorMsg1);
  });

  it('Should not return any error if validation succeeds', () => {
    const field = faker.database.column();

    const { sut } = makeSut(field);

    const error = sut.validate(field, { [field]: faker.random.word() });

    expect(error).toBeFalsy();
  });
});

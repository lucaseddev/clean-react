import faker from '@faker-js/faker';
import { ValidationSpy } from '../test/mock-field-validation';
import { ValidationComposite } from './validation-composite';

describe('ValidationComposite', () => {
  it('Should return error if any validation fails', () => {
    const field = faker.database.column();
    const fieldValidationSpySuccess = new ValidationSpy(field);
    const fieldValidationSpy2Error = new ValidationSpy(field);

    const errorMsg = 'Any_Message';
    fieldValidationSpy2Error.error = new Error(errorMsg);

    const sut = new ValidationComposite([
      fieldValidationSpySuccess,
      fieldValidationSpy2Error,
    ]);

    const error = sut.validate(field, faker.random.word());

    expect(error).toBe(errorMsg);
  });
});

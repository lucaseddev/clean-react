import {
  ValidationBuilder,
  ValidationComposite,
} from '@/validation/validators';
import { makeLoginValidation } from './login-validation-factory';

describe('LoginValidationFactory', () => {
  it('Should make ValidationComposit with correct validations', () => {
    const composite = makeLoginValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(6).build(),
      ])
    );
  });
});

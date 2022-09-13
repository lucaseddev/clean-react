import {
    ValidationBuilder,
    ValidationComposite,
  } from '@/validation/validators';
  import { makeSignUpValidation } from './signup-validation-factory';
  
  describe('SignUpValidationFactory', () => {
    it('Should make ValidationComposit with correct validations', () => {
      const composite = makeSignUpValidation();
      expect(composite).toEqual(
        ValidationComposite.build([
            ...ValidationBuilder.field('name').required().min(4).build(),
            ...ValidationBuilder.field('email').required().email().build(),
            ...ValidationBuilder.field('password').required().min(6).build(),
            ...ValidationBuilder.field('passwordConfirmation').required().compare('password').build(),
        ])
      );
    });
  });
  
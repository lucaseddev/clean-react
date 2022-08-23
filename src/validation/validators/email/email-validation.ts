import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols';

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}
  validate(value: string): InvalidFieldError {
    const emailRegex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return (!value || emailRegex.test(value)) ? null : new InvalidFieldError(this.field);
  }
}

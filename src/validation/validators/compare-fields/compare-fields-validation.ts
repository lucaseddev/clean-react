import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols';

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate(input: object): InvalidFieldError {
    return input[this.field] !== input[this.fieldToCompare]
      ? new InvalidFieldError(this.field)
      : null;
  }
}

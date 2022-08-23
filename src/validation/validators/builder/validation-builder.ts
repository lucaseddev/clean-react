import { FieldValidation } from '@/validation/protocols';
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from '@/validation/validators';

export class ValidationBuilder {
  private constructor(
    private readonly field: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.field));
    return this;
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.field));
    return this;
  }

  min(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.field, length));
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}

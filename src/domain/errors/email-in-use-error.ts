export class EmailInUseError extends Error {
  constructor() {
    super('Este e-mail já está sendo utilizado.');
    this.name = "EmailInUseError"
  }
}

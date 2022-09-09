import { faker } from '@faker-js/faker';
import { AddAccountParams } from '../usecases';

export const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password();

  return {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password,
    passwordConfirmation: password,
  };
};

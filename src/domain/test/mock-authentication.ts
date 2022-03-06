import { AuthenticationParams } from '../usecases/authentication';
import faker from '@faker-js/faker'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  passowrd: faker.internet.password(),
});
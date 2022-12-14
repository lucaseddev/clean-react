import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http';
import { Authentication } from '@/domain/usecases';

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient());
};

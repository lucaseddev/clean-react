import { HttpPostClientSpy } from '../../test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    const url = '';
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});

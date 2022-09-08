import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '@/data/protocols/http';
import axios, { AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpPostClient<unknown, never> {
  async post(params: HttpPostParams<unknown>): Promise<HttpResponse<never>> {
    let httpResponse: AxiosResponse<never>;

    try {
      httpResponse = await axios.post(params.url, params.body);
    } catch (error) {
      httpResponse = error.response;
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}

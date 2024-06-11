import { HttpFetchOptions } from './http-fetch-options';
import { IHttpClient } from './interfaces';

type Constructor = {
  getAuthToken?: () => string;
};

class HttpClient implements IHttpClient {
  getAuthToken?: () => string;

  constructor({ getAuthToken }: Constructor) {
    this.getAuthToken = getAuthToken;
  }

  request = async <T>(options: HttpFetchOptions): Promise<T> => {
    const response = await window.fetch(options.url, {
      method: options.method,
      ...(options.body ? { body: options.body } : {}),
      headers: new Headers(Object.entries(options.headers)),
    });

    const responseJson = await (response.json() as Promise<T>);

    return responseJson;
  };
}

export { HttpClient };

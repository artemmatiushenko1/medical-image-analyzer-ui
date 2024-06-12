import { ValueOf } from '@/libs/types';
import { HttpError } from './exceptions';
import { HttpFetchOptions } from './http-fetch-options';
import { IHttpClient } from './interfaces';
import { HttpStatus } from './enums';

class HttpClient implements IHttpClient {
  private getAuthToken?: () => string | null;

  setAuthTokenGetter = (getter: typeof this.getAuthToken) => {
    this.getAuthToken = getter;
  };

  request = async <T>(options: HttpFetchOptions): Promise<T> => {
    const headers = new Headers(Object.entries(options.headers));

    if (options.authorized) {
      const accessToken = this.getAuthToken?.();

      console.log({ accessToken });

      if (!accessToken) {
        throw Error('Access token is required for authorized request!');
      }

      headers.append('Authorization', accessToken);
    }

    const response = await window.fetch(options.url, {
      headers,
      method: options.method,
      ...(options.body ? { body: options.body } : {}),
    });

    if (!response.ok) {
      throw new HttpError(
        response.status as ValueOf<typeof HttpStatus>,
        response.statusText,
      );
    }

    const responseJson = await (response.json() as Promise<T>);

    return responseJson;
  };
}

export { HttpClient };

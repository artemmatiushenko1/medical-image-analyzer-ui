import { ValueOf } from '@/libs/types';
import { HttpError } from './exceptions';
import { HttpFetchOptions } from './http-fetch-options';
import { IHttpClient } from './interfaces';
import { HttpStatus } from './enums';

class HttpClient implements IHttpClient {
  private getAuthToken?: () => string | null;

  private baseUrl!: string;

  setAuthTokenGetter = (getter: typeof this.getAuthToken) => {
    this.getAuthToken = getter;
  };

  setBaseUrl = (baseUrl: string) => {
    this.baseUrl = baseUrl;
  };

  request = async <T>(options: HttpFetchOptions): Promise<T> => {
    if (!this.baseUrl) {
      throw Error('Base url is not set!');
    }

    const headers = new Headers(Object.entries(options.headers));

    if (options.authorized) {
      const accessToken = this.getAuthToken?.();

      if (!accessToken) {
        throw Error('Access token is required for authorized request!');
      }

      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    const response = await window.fetch(this.baseUrl + options.url, {
      headers,
      method: options.method,
      ...(options.body ? { body: options.body } : {}),
    });

    if (!response.ok) {
      const error = (await response.json()) as {
        type: string;
        message: string | string[];
        statusCode: number;
      };

      throw new HttpError(
        response.status as ValueOf<typeof HttpStatus>,
        (Array.isArray(error.message)
          ? error.message.join(',')
          : error.message) || response.statusText,
      );
    }

    const responseJson = await (response.json() as Promise<T>);

    return responseJson;
  };
}

export { HttpClient };

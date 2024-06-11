import { HttpFetchOptions } from './http-fetch-options';

interface IHttpClient {
  request: <T>(options: HttpFetchOptions) => Promise<T>;
}

export { type IHttpClient };

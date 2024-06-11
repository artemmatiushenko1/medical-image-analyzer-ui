import { IHttpClient } from './interfaces';

class HttpApi {
  constructor(protected httpClient: IHttpClient) {}
}

export { HttpApi };

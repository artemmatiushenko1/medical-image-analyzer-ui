import { ValueOf } from '@/libs/types';
import { HttpMethod } from './enums';
import { HttpFetchOptions } from './http-fetch-options';
import { MimeType } from '@/libs/enums';

class HttpRequestOptionsBuilder {
  private fetchOptions!: HttpFetchOptions;

  constructor(private accessToken?: string) {
    this.reset();

    this.get = this.method.bind(this, HttpMethod.GET);
    this.post = this.method.bind(this, HttpMethod.POST);
    this.put = this.method.bind(this, HttpMethod.PUT);
    this.patch = this.method.bind(this, HttpMethod.PATCH);
    this.delete = this.method.bind(this, HttpMethod.DELETE);
  }

  get: () => typeof this;
  put: () => typeof this;
  post: () => typeof this;
  patch: () => typeof this;
  delete: () => typeof this;

  reset = () => {
    this.fetchOptions = new HttpFetchOptions();
  };

  url = (url: string) => {
    this.fetchOptions.url = url;
    return this;
  };

  body = (body: BodyInit) => {
    this.fetchOptions.body = body;
    return this;
  };

  method = (method: ValueOf<typeof HttpMethod>) => {
    this.fetchOptions.method = method;
    return this;
  };

  contentType = (contentType: ValueOf<typeof MimeType>) => {
    this.fetchOptions.headers = {
      ...this.fetchOptions.headers,
      'Content-Type': contentType,
    };

    return this;
  };

  authorized = () => {
    if (!this.accessToken) {
      throw Error('Access token is required for authorized request!');
    }

    this.fetchOptions.headers = {
      ...this.fetchOptions.headers,
      Authorization: this.accessToken,
    };

    return this;
  };

  build = () => {
    // TODO: add validation for fetchOptions params?
    return this.fetchOptions;
  };
}

export { HttpRequestOptionsBuilder };

import { ValueOf } from '@/libs/types';
import { HttpMethod } from './enums';
import { HttpFetchOptions } from './http-fetch-options';
import { MimeType } from '@/libs/enums';

type HttpMethodSetter = (url: string) => HttpRequestOptionsBuilder;

class HttpRequestOptionsBuilder {
  private fetchOptions!: HttpFetchOptions;

  get: HttpMethodSetter;
  put: HttpMethodSetter;
  post: HttpMethodSetter;
  patch: HttpMethodSetter;
  delete: HttpMethodSetter;

  constructor() {
    this.reset();

    this.get = this.method.bind(this, HttpMethod.GET);
    this.post = this.method.bind(this, HttpMethod.POST);
    this.put = this.method.bind(this, HttpMethod.PUT);
    this.patch = this.method.bind(this, HttpMethod.PATCH);
    this.delete = this.method.bind(this, HttpMethod.DELETE);
  }

  private reset = () => {
    this.fetchOptions = new HttpFetchOptions();
  };

  body = (body: BodyInit) => {
    this.fetchOptions.body = body;
    return this;
  };

  method = (method: ValueOf<typeof HttpMethod>, url: string) => {
    this.fetchOptions.method = method;
    this.fetchOptions.url = url;
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
    this.fetchOptions.authorized = true;
    return this;
  };

  build = () => {
    // TODO: add validation for fetchOptions params?
    return this.fetchOptions;
  };
}

export { HttpRequestOptionsBuilder };

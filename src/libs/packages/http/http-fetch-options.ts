import { ValueOf } from '@/libs/types';
import { HttpMethod } from './enums';

class HttpFetchOptions {
  method!: ValueOf<typeof HttpMethod>;
  body?: BodyInit;
  url!: string;
  headers: Record<string, string> = {};
}

export { HttpFetchOptions };

import { ValueOf } from '@/libs/types';
import { HttpStatus } from '../enums';

class HttpError extends Error {
  status: ValueOf<typeof HttpStatus>;

  constructor(status: ValueOf<typeof HttpStatus>, message: string) {
    super(message);

    this.status = status;
    this.message = message;
  }
}

export { HttpError };

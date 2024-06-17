import { ValueOf } from '@/libs/types';
import { ModelStatus } from '../enums';

type ChangeModelStatusRequest = {
  status: ValueOf<typeof ModelStatus>;
};

export { type ChangeModelStatusRequest };

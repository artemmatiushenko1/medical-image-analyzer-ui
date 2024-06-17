import { ValueOf } from '@/libs/types';
import { ModelVersionStatus } from '../enums';

type ChangeModelVersionStatusRequest = {
  status: ValueOf<typeof ModelVersionStatus>;
};

export { type ChangeModelVersionStatusRequest };

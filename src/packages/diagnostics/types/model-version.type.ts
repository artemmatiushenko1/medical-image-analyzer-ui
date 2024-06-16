import { ValueOf } from '@/libs/types';
import { ModelVersionStatus } from '../enums';

type ModelVersion = {
  id: string;
  createdAt: string;
  name: string;
  description?: string;
  status: ValueOf<typeof ModelVersionStatus>;
  updatedAt: string;
  version: number;
};

export { type ModelVersion };

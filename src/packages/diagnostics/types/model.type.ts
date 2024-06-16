import { ValueOf } from '@/libs/types';
import { ModelVersion } from './model-version.type';
import { ModelStatus } from '../enums';

type Model = {
  id: string;
  enabled: boolean;
  name: string;
  currentVersion: ModelVersion;
  typeId: string;
  createdAt: string;
  updatedAt: string;
  queueName: string;
  description: string | null;
  status: ValueOf<typeof ModelStatus>;
};

export { type Model };

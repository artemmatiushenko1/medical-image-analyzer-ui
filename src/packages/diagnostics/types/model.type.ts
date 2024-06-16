import { ValueOf } from '@/libs/types';
import { ModelVersion } from './model-version.type';
import { ModelStatus } from '../enums';
import { Diagnostic } from './diagnostic.type';

interface Model {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  queueName: string;
  description: string | null;
  status: ValueOf<typeof ModelStatus>;
  type: Diagnostic;
  versions: ModelVersion[];
  currentVersion: ModelVersion | null;
}

export { type Model };

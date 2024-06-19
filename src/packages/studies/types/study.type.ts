import { ValueOf } from '@/libs/types';
import { StudyStatus } from '../enums';

type File = {
  src: string;
};

type StudySummary = {
  id: string;
  name: string;
  status: ValueOf<typeof StudyStatus>;
  description?: string;
  image: File;
  createdAt: string;
  updatedAt: string;
};

type Study = StudySummary & {
  confidence?: number;
};

export { type Study, type StudySummary };

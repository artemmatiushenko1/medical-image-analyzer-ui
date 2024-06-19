import { ValueOf } from '@/libs/types';
import { StudyStatus } from '../enums';
import { Diagnostic, Model } from '@/packages/diagnostics';

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
  type: Diagnostic;
  model: Model;
};

export { type Study, type StudySummary };

import { ValueOf } from '@/libs/types';
import { StudyStatus } from '../enums';
import { Diagnostic, Model } from '@/packages/diagnostics';

type Study = {
  id: string;
  diagnostic: Diagnostic;
  model: Model;
  date: string;
  imageSrc: string;
  status: ValueOf<typeof StudyStatus>;
  confidence?: number;
};

export { type Study };

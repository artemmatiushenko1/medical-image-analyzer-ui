import { ValueOf } from '@/libs/types';
import { StudyStatus } from '../enums';

type Study = {
  id: string;
  diagnostic: string;
  date: string;
  imageSrc: string;
  status: ValueOf<typeof StudyStatus>;
  confidence?: number;
};

export { type Study };

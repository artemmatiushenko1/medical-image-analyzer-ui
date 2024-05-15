import { ValueOf } from '@/libs/types';
import { StudyStatus } from '../enums';

type Study = {
  id: string;
  diagnostic: string;
  date: string;
  imageSrc: string;
  status: ValueOf<typeof StudyStatus>;
};

export { type Study };

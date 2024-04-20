import { ValueOf } from '@/libs/types';
import { Gender, StudySubject } from './enums';

type PatientInfo = {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: ValueOf<typeof Gender>;
};

type StudyMetadata = {
  subject: ValueOf<typeof StudySubject>;
};

type StudyInfo = PatientInfo & StudyMetadata;

export { type StudyInfo };

import { Gender, StudySubject } from './enums';

type SelectOption = {
  key: string | number;
  title: string;
  value: string | number;
};

const GENDER_SELECT_OPTIONS: SelectOption[] = [
  { key: Gender.MALE, title: 'Male', value: Gender.MALE },
  { key: Gender.FEMALE, title: 'Female', value: Gender.FEMALE },
] as const;

const STUDY_SUBJECT_SELECT_OPTIONS: SelectOption[] = [
  {
    key: StudySubject.LUNGS_X_RAY,
    title: 'Lungs X-Ray',
    value: StudySubject.LUNGS_X_RAY,
  },
  {
    key: StudySubject.SKIN,
    title: 'Skin',
    value: StudySubject.SKIN,
  },
] as const;

export { GENDER_SELECT_OPTIONS, STUDY_SUBJECT_SELECT_OPTIONS };

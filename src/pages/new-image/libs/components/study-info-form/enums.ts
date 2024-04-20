const Gender = {
  NONE: 0,
  MALE: 1,
  FEMALE: 2,
} as const;

const StudySubject = {
  NONE: 0,
  LUNGS_X_RAY: 1,
  BONES_X_RAY: 2,
  SKIN: 3,
  EYES: 4,
} as const;

export { Gender, StudySubject };

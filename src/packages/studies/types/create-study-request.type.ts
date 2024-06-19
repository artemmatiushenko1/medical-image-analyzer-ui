type CreateStudyRequest = {
  file: File;
  name: string;
  description?: string;
  modelIds: string[];
};

export { type CreateStudyRequest };

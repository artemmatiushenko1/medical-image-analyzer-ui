import userHandlers from './users';
import authHandlers from './auth';
import studyHandlers from './studies';
import diagnosticHandlers from './diagnostics';

const handlers = [
  ...userHandlers,
  ...authHandlers,
  ...studyHandlers,
  ...diagnosticHandlers,
];

export { handlers };

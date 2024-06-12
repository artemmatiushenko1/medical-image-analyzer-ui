import userHandlers from './users';
import authHandlers from './auth';
import studyHandlers from './studies';

const handlers = [...userHandlers, ...authHandlers, ...studyHandlers];

export { handlers };

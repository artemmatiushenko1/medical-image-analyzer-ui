import userHandlers from './users';
import authHandlers from './auth';

const handlers = [...userHandlers, ...authHandlers];

export { handlers };

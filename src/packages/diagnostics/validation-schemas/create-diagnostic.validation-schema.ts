import Joi from 'joi';
import { CreateDiagnosticRequest } from '../types';

const createDiagnosticSchema = Joi.object<CreateDiagnosticRequest>({
  name: Joi.string().required(),
});

export { createDiagnosticSchema };

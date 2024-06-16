import Joi from 'joi';
import { CreateDiagnosticRequest } from '../types';

const createDiagnosticSchema = Joi.object<CreateDiagnosticRequest>({
  name: Joi.string().required(),
  description: Joi.string().optional().allow(''),
});

export { createDiagnosticSchema };

import Joi from 'joi';
import { CreateDiagnosticRequest } from '../types';

const createDiagnosticSchema = Joi.object<CreateDiagnosticRequest>({
  name: Joi.string().required().max(128),
  description: Joi.string().optional().allow('').max(500),
});

export { createDiagnosticSchema };

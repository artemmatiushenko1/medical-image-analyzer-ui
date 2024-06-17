import Joi from 'joi';
import { CreateModelVersionRequest } from '../types';

const createModelVersionSchema = Joi.object<CreateModelVersionRequest>({
  name: Joi.string().required().max(128),
  description: Joi.string().empty().allow('').max(500),
  file: Joi.required(),
});

export { createModelVersionSchema };

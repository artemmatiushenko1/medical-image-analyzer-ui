import Joi from 'joi';
import { CreateModelVersionRequest } from '../types';

const createModelVersionSchema = Joi.object<CreateModelVersionRequest>({
  name: Joi.string().required(),
  changelog: Joi.string().empty().allow(''),
  file: Joi.required(),
});

export { createModelVersionSchema };

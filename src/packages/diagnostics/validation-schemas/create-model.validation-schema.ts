import Joi from 'joi';
import { CreateModelRequest } from '../types';

const createModelSchema = Joi.object<CreateModelRequest>({
  name: Joi.string().required(),
  file: Joi.required(),
});

export { createModelSchema };

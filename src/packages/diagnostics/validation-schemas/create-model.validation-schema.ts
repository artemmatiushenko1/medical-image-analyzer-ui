import Joi from 'joi';

const createModelSchema = Joi.object({
  name: Joi.string().required().max(128),
  file: Joi.required(),
  description: Joi.string().optional().allow('').max(500),
});

export { createModelSchema };

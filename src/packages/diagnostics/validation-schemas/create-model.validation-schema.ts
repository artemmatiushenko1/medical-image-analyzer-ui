import Joi from 'joi';

const createModelSchema = Joi.object({
  name: Joi.string().required().max(128),
  file: Joi.required(),
});

export { createModelSchema };

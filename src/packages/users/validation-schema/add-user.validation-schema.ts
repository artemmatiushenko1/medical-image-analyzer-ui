import Joi from 'joi';
import { AddUserRequest } from '../types';

const addUserSchema = Joi.object<AddUserRequest>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email({ tlds: false }).required(),
});

export { addUserSchema };

import Joi from 'joi';
import { SignInRequest } from '../types';

const signInSchema = Joi.object<SignInRequest>({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().required(),
});

export { signInSchema };

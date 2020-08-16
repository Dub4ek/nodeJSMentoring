import Joi from '@hapi/joi';

export const UserCreate = Joi.object({
  login: Joi.string()
  .required(),

  password: Joi.string()
  .required()
  .alphanum(),

  age: Joi.number()
  .integer()
  .min(4)
  .max(130)
  .required(),
});

export const UserUpdate = Joi.object({
  login: Joi.string(),

  password: Joi.string()
  .alphanum(),

  age: Joi.number()
  .integer()
  .min(4)
  .max(130)
});

export const UserDelete = Joi.object({
  id: Joi.string()
  .required(),
});
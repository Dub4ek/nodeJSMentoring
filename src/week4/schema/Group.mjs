import Joi from '@hapi/joi';
import GROUP_PERMISSIONS from '../constant/GroupPermissions.constant.mjs';

export const GroupCreate = Joi.object({
  name: Joi.string()
    .required()
    .alphanum(),

  permissions: Joi.array()
    .items(Joi.string().valid(GROUP_PERMISSIONS.READ, GROUP_PERMISSIONS.WRITE, GROUP_PERMISSIONS.DELETE, GROUP_PERMISSIONS.SHARE, GROUP_PERMISSIONS.UPLOAD_FILES))
    .required()
});

export const GroupUpdate = Joi.object({
  id: Joi.string().required(),
  name: Joi.string()
    .alphanum(),

  permissions: Joi.array()
    .items(Joi.string().valid(GROUP_PERMISSIONS.READ, GROUP_PERMISSIONS.WRITE, GROUP_PERMISSIONS.DELETE, GROUP_PERMISSIONS.SHARE, GROUP_PERMISSIONS.UPLOAD_FILES))
});

export const GroupById = Joi.object({
  id: Joi.string()
    .required()
});

export const GroupsList = Joi.object({
  login: Joi.string(),
  limit: Joi.number()
});

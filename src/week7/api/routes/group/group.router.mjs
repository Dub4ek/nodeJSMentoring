import express from 'express';
import GroupService from '../../../services/group.service.mjs';
import middlewares from '../../middleware/index.mjs';
import { GroupById, GroupCreate, GroupsList, GroupUpdate } from '../../../schema/Group.mjs';
import {
  addGroup,
  deleteGroup,
  getGroup,
  listGroups,
  updateGroup
} from './group.methods.mjs';

const route = express.Router();

export default function (app, dbConnector) {
  app.use('/groups', route);
  const groupService = new GroupService(dbConnector);

  route.get('/', middlewares.validateMiddleware(GroupById), middlewares.isAuthorised, getGroup(groupService));
  route.put('/', middlewares.validateMiddleware(GroupCreate), middlewares.isAuthorised, addGroup(groupService));
  route.delete('/', middlewares.validateMiddleware(GroupById), middlewares.isAuthorised, deleteGroup(groupService));
  route.post('/', middlewares.validateMiddleware(GroupUpdate), middlewares.isAuthorised, updateGroup(groupService));
  route.post('/list', middlewares.validateMiddleware(GroupsList), middlewares.isAuthorised, listGroups(groupService));
}

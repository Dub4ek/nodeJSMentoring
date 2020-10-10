import express from 'express';
import GroupDto from '../../dto/Group.dto.mjs';
import GroupService from '../../services/group.service.mjs';
import middlewares from '../middleware/index.mjs';
import { GroupById, GroupCreate, GroupsList, GroupUpdate } from '../../schema/Group.mjs';

const { Router } = express;
const route = new Router();

export default function (app, dbConnector) {
  app.use('/groups', route);
  const groupService = new GroupService(dbConnector);

  route.get('/', middlewares.validateMiddleware(GroupById), middlewares.isAuthorised, async (req, res, next) => {
    const request = req.body;

    try {
      const getGroupResult = await groupService.getGroup(request);

      return res.status(200).json(GroupDto.fromObject(getGroupResult));
    } catch (e) {
      return next(e);
    }
  });

  route.put('/', middlewares.validateMiddleware(GroupCreate), middlewares.isAuthorised, async (req, res, next) => {
    try {
      const groupDTO = GroupDto.fromObject(req.body);
      const addGroupResult = await groupService.addGroup(groupDTO);

      return res.status(201).json(GroupDto.fromObject(addGroupResult));
    } catch (e) {
      return next(e);
    }
  });

  route.delete('/', middlewares.validateMiddleware(GroupById), middlewares.isAuthorised, async (req, res, next) => {
    try {
      const group = req.body;
      await groupService.deleteGroup(group);

      return res.json({ text: 'Group successfully has been deleted' });
    } catch (e) {
      return next(e);
    }
  });

  route.post('/', middlewares.validateMiddleware(GroupUpdate), middlewares.isAuthorised, async (req, res, next) => {
    try {
      const group = GroupDto.fromObject(req.body);
      const updateGroupResult = await groupService.updateGroup(group);

      return res.json(GroupDto.fromObject(updateGroupResult));
    } catch (e) {
      return next(e);
    }
  });

  route.post('/list', middlewares.validateMiddleware(GroupsList), middlewares.isAuthorised, async (req, res, next) => {
    try {
      const request = req.body;
      const listGroupResult = await groupService.listGroups(request);

      return res.json(listGroupResult);
    } catch (e) {
      return next(e);
    }
  });
}

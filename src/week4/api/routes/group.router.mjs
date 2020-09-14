import express from 'express';
import GroupDto from '../../dto/Group.dto.mjs';
import GroupService from '../../services/group.service.mjs';
import middlewares from '../middleware/index.mjs';
import { GroupById, GroupCreate, GroupsList, GroupUpdate } from '../../schema/Group.mjs';

const { Router } = express;
const route = new Router();
const groupService = new GroupService();

export default function (app) {
  app.use('/groups', route);

  route.get('/', middlewares.validateMiddleware(GroupById), async (req, res) => {
    const request = req.body;

    try {
      const getGroupResult = await groupService.getGroup(request);

      return res.status(200).json(GroupDto.fromObject(getGroupResult));
    } catch (e) {
      if (e.message) {
        return res.status(404).send(e.message);
      }

      return res.status(500).send("Unknown error");
    }
  });

  route.put('/', middlewares.validateMiddleware(GroupCreate), async (req, res) => {
    try {
      const groupDTO = GroupDto.fromObject(req.body);
      const addGroupResult = await groupService.addGroup(groupDTO);

      return res.status(201).json(GroupDto.fromObject(addGroupResult));
    } catch (e) {
      if (e.message) {
        return res.status(404).send(e.message);
      }

      return res.status(500).send("Unknown error");
    }
  });

  route.delete('/', middlewares.validateMiddleware(GroupById), async (req, res) => {
    try {
      const group = req.body;
      await groupService.deleteGroup(group);

      return res.json({ text: 'Group successfully has been deleted' });
    } catch (e) {
      if (e.message) {
        return res.status(404).send(e.message);
      }

      return res.status(500).send("Unknown error");
    }
  });

  route.post('/', middlewares.validateMiddleware(GroupUpdate), async (req, res) => {
    try {
      const group = GroupDto.fromObject(req.body);
      const updateGroupResult = await groupService.updateGroup(group);

      return res.json(GroupDto.fromObject(updateGroupResult));
    } catch (e) {
      if (e.message) {
        return res.status(404).send(e.message);
      }

      return res.status(500).send("Unknown error");
    }
  });

  route.post('/list', middlewares.validateMiddleware(GroupsList), async (req, res) => {
    try {
      const request = req.body;
      const listGroupResult = await groupService.listGroups(request);

      return res.json(listGroupResult);
    } catch (e) {
      if (e.message) {
        return res.status(404).send(e.message);
      }

      return res.status(500).send("Unknown error");
    }
  });
}

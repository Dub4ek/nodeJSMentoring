import express from 'express';
import UserDto from '../../dto/UserDto.mjs';
import UserService from '../../services/user.service.mjs';
import UserResponse from '../../dto/UserResponse.mjs';
import middlewares from '../middleware/index.mjs';
import { UserCreate, UserUpdate } from '../../schema/User.mjs';
import { UserById, UsersList } from '../../schema/User.mjs';
import { UserToGroup } from '../../schema/User.mjs';

const { Router } = express;
const route = new Router();

export default function (app, dbConnector) {
  app.use('/users', route);

  const userService = new UserService(dbConnector);

  route.get('/', middlewares.validateMiddleware(UserById), async (req, res) => {
    const request = req.body;
    try {
      const getUserResult = await userService.getUser(request);

      return res.status(200).json(UserResponse.fromObject(getUserResult));
    } catch (e) {
      if (e.message) {
        return res.status(404).send(e.message);
      }

      return res.status(500).send("Unknown error");
    }
  });

  route.put('/', middlewares.validateMiddleware(UserCreate),  async (req, res) => {
    const userDTO = UserDto.fromObject(req.body);
    try {
      const addUserResult = await userService.addUser(userDTO);

      return res.status(201).json(UserResponse.fromObject(addUserResult));
    } catch (e) {
      if (e.message) {
        return res.status(404).send(e.message);
      }

      return res.status(500).send("Unknown error");
    }
  });

  route.post('/', middlewares.validateMiddleware(UserUpdate), async (req, res) => {
    try {
      const userDTO = UserDto.fromObject(req.body);
      const updateUserResult = await userService.updateUser(userDTO);

      return res.json(UserResponse.fromObject(updateUserResult));
    } catch (e) {
      if (e.message) {
        return res.status(404).send(e.message);
      }

      return res.status(500).send("Unknown error");
    }
  });

  route.delete('/', middlewares.validateMiddleware(UserById),  async (req, res) => {
    try {
      const request = req.body;
      await userService.deleteUser(request);

      return res.json({ text: 'User successfully has been deleted' });
    } catch (e) {
      if (e.message) {
        return res.status(404).send(e.message);
      }

      return res.status(500).send("Unknown error");
    }
  });

  route.post('/list', middlewares.validateMiddleware(UsersList), async (req, res) => {
    try {
      const request = req.body;
      const listUsersResult = await userService.listUsers(request);

      return res.json(listUsersResult);
    } catch (e) {
      if (e.message) {
        return res.status(404).send(e.message);
      }

      return res.status(500).send("Unknown error");
    }
  });

  route.post('/addUsersToGroup', middlewares.validateMiddleware(UserToGroup), async (req, res) => {
    try {
      const request = req.body;
      await userService.addUsersToGroup(request);

      return res.json({ test: "Users have been successfully added to the group" });
    } catch (e) {
      if (e.message) {
        return res.status(404).send(e.message);
      }
    }

    return res.status(500).send("Unknown error");
  });
}

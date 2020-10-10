import express from 'express';
import UserDto from '../../dto/UserDto.mjs';
import UserService from '../../services/user.service.mjs';
import UserResponse from '../../dto/UserResponse.mjs';
import middlewares from '../middleware/index.mjs';
import { UserCreate, UserUpdate } from '../../schema/User.mjs';
import { UserById, UsersList } from '../../schema/User.mjs';
import { UserToGroup } from '../../schema/User.mjs';
import { UserLogin } from '../../schema/User.mjs';

const { Router } = express;
const route = new Router();

export default function (app, dbConnector) {
  app.use('/users', route);

  const userService = new UserService(dbConnector);

  route.get('/', middlewares.validateMiddleware(UserById), middlewares.isAuthorised, async (req, res, next) => {
    const request = req.body;

    try {
      const getUserResult = await userService.getUser(request);

      return res.status(200).json(UserResponse.fromObject(getUserResult));
    } catch (e) {
      return next(e);
    }
  });

  route.put('/', middlewares.validateMiddleware(UserCreate), middlewares.isAuthorised,  async (req, res, next) => {
    const userDTO = UserDto.fromObject(req.body);

    try {
      const addUserResult = await userService.addUser(userDTO);

      return res.status(201).json(UserResponse.fromObject(addUserResult));
    } catch (e) {
      return next(e);
    }
  });

  route.post('/', middlewares.validateMiddleware(UserUpdate), middlewares.isAuthorised, async (req, res, next) => {
    try {
      const userDTO = UserDto.fromObject(req.body);
      const updateUserResult = await userService.updateUser(userDTO);

      return res.json(UserResponse.fromObject(updateUserResult));
    } catch (e) {
      return next(e);
    }
  });

  route.delete('/', middlewares.validateMiddleware(UserById), middlewares.isAuthorised, async (req, res, next) => {
    try {
      const request = req.body;
      await userService.deleteUser(request);

      return res.json({ text: 'User successfully has been deleted' });
    } catch (e) {
      return next(e);
    }
  });

  route.post('/list', middlewares.validateMiddleware(UsersList), middlewares.isAuthorised, async (req, res, next) => {
    try {
      const request = req.body;
      const listUsersResult = await userService.listUsers(request);

      return res.json(listUsersResult);
    } catch (e) {
      return next(e);
    }
  });

  route.post('/addUsersToGroup', middlewares.validateMiddleware(UserToGroup), middlewares.isAuthorised, async (req, res, next) => {
    try {
      const request = req.body;
      await userService.addUsersToGroup(request);

      return res.json({ test: "Users have been successfully added to the group" });
    } catch (e) {
      return next(e);
    }
  });

  route.post('/login', middlewares.validateMiddleware(UserLogin), async (req, res, next) => {
    try {
      const request = req.body;
      const signinResult = await userService.loginUser(request);

      return res.json({ user: UserResponse.fromObject(signinResult.user), token: signinResult.token });
    } catch (e) {
      return next(e);
    }
  });
}

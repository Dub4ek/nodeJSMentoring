import express from 'express';
import UserService from '../../../services/user.service.mjs';
import middlewares from '../../middleware/index.mjs';
import {
  UserCreate,
  UserUpdate,
  UserById,
  UsersList,
  UserToGroup,
  UserLogin
} from '../../../schema/User.mjs';
import {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  listUsers,
  addUsersToGroup,
  loginUser
} from './user.methods.mjs';

const route = express.Router();

export default function (app, dbConnector) {
  app.use('/users', route);

  const userService = new UserService(dbConnector);

  route.get('/', middlewares.validateMiddleware(UserById), middlewares.isAuthorised, getUser(userService));
  route.put('/', middlewares.validateMiddleware(UserCreate), middlewares.isAuthorised, addUser(userService));
  route.post('/', middlewares.validateMiddleware(UserUpdate), middlewares.isAuthorised, updateUser(userService));
  route.delete('/', middlewares.validateMiddleware(UserById), middlewares.isAuthorised, deleteUser(userService));
  route.post('/list', middlewares.validateMiddleware(UsersList), middlewares.isAuthorised, listUsers(userService));
  route.post('/addUsersToGroup', middlewares.validateMiddleware(UserToGroup), middlewares.isAuthorised, addUsersToGroup(userService));

  route.post('/login', middlewares.validateMiddleware(UserLogin), loginUser(userService));
}

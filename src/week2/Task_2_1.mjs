import express from 'express';
import config from 'config';
import UserStorage from './UserStorage.mjs';
import bodyParser from 'body-parser';
import UserResponse from './dto/UserResponse.mjs';
import { UserCreate, UserUpdate, UserDelete} from './schema/User.mjs';
import { validateMiddleware } from './schema/validateMiddleware.mjs';

const application = express();
const port = config.get('Webserver.port');
const { Router } = express;
const router = new Router();
const userStorage = new UserStorage();

router.route('/user/:id')
  .get((req, res, next) => {
    const { id } = req.params;

    res.status(200).send(userStorage.getUser(id));
  });

router.route('/user/list')
  .post((req, res) => {
    const { login, limit } = req.body;
    const allUsers = userStorage.getAllUsers(login, limit).map(item => UserResponse.fromObject(item))

    res.status(200).send(allUsers);
  });

router.route('/user')
  .put(validateMiddleware(UserUpdate), (req, res) => {
    userStorage.addUser(value);
    res.status(201).send('User successfully added');
  })
  .post(validateMiddleware(UserCreate), (req, res) => {
    userStorage.updateUser(value);
    res.send('User successfully updated');
  })
  .get((req, res) => {
    res.status(200).send(userStorage.getAllUsers());
  })
  .delete(validateMiddleware(UserDelete), (req, res) => {
    userStorage.deleteUser(value.id)
    res.status(200).send('User successfully deleted');
  });

application.use(bodyParser.json())
application.use('/', router);
application.listen(port, () => console.log(`Application successfully started on port: ${port}`));

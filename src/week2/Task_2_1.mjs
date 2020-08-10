import express, { Router } from 'express';
import config from 'config';
import UserStorage from './UserStorage';

const application = express();
const port = config.get('Webserver.port');
const router = new Router();

router.route('/user/:id')
  .get((res, req, next) => {

  });

router.route('/user')
  .put((res, req) => {

  });

application.listen(port);
application.use('/', router);
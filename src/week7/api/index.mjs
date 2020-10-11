import express from 'express';
import user from './routes/user/user.router.mjs';
import group from './routes/group/group.router.mjs';

export default function (dbConnector) {
  const app = express.Router();
  user(app, dbConnector);
  group(app, dbConnector);

  return app;
}

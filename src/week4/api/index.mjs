import express from 'express';
import user from './routes/user.router.mjs';
import group from './routes/group.router.mjs';

export default function (dbConnector) {
  const app = new express.Router();
  user(app, dbConnector);
  group(app, dbConnector);

  return app;
}

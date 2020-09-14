import express from 'express';
import user from './routes/user.router.mjs';
import group from './routes/group.router.mjs';

export default function () {
  const app = new express.Router();
  user(app);
  group(app);

  return app;
}

import express from 'express';
import user from './routes/user.router.mjs';

export default function () {
  const app = new express.Router();
  user(app);

  return app;
}

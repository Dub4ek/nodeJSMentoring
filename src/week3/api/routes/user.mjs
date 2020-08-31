import express from 'express';

const { Router } = express;
const route = new Router();

export default function(app) {
  app.use('/users', route);

  route.get('/me', (req, res) => {
    return res.json({test: 'NEST'});
  });
}
import bodyParser from 'body-parser';
import routes from '../api/index.mjs';

export default function (app) {
  app.use(bodyParser());
  app.use('/', routes());
}
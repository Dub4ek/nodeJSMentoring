import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from '../api/index.mjs';

export default function (app) {
  app.use(morgan('tiny'));
  app.use(bodyParser());
  app.use('/', routes());
}

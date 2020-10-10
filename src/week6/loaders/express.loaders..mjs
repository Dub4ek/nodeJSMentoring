import bodyParser from 'body-parser';
import morgan from 'morgan';
import winston from 'winston';
import cors from 'cors';
import routes from '../api/index.mjs';

export default function (app, dbConnector) {
  morgan.token('reqArgs', (req) => JSON.stringify(req.body));
  app.use(morgan(':method :url :reqArgs :status :res[content-length] - :response-time ms', {
    skip: (_, res) => res.statusCode < 400
  }));
  app.use(bodyParser.json());
  app.use('/', routes(dbConnector));
  app.use(cors());

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.code === 'credentials_required') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    } else if (err.name === 'UnauthorizedError') {
      return res
        .status(403)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  app.use((err, req, res) => {
    res.status(err.status || 500);
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.json({
      errors: {
        message: err.message
      }
    });
  });
}

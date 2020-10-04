import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from '../api/index.mjs';

export default function (app, dbConnector) {
  app.use(morgan('tiny'));
  app.use(bodyParser());
  app.use('/', routes(dbConnector));

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message
      }
    });
  });
}

import express from 'express';
import config from 'config';
import Logger from './loaders/logger.loaders.mjs';

async function startServer() {
  const application = express();
  const port = config.get('Webserver.port');
  const value = await import('./loaders/index.mjs');
  await value.default({ expressApp: application });

  application.listen(port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }
    console.log(`
      ################################################
        🛡️  Server listening on port: ${port} 🛡️ 
      ################################################
    `);
  });
}

process.on('uncaughtException', err => {
  Logger.error(err);
  process.exit(1);
});

process.on('unhandledRejection', error => {
  Logger.error(error);
});

startServer();

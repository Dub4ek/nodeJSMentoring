import express from 'express'
import config from 'config';

async function startServer() {
  const application = express();
  const port = config.get('Webserver.port');
  const value = await import('./loaders/index.mjs');
  await value.default({ expressApp: application });

  application.listen(port, () => {
    console.log(`
      ################################################
        🛡️  Server listening on port: ${port} 🛡️ 
      ################################################
    `);
  });
}

startServer();
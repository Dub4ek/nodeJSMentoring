import expressLoader from './express.loaders..mjs';
import sequilize from './sequelize.loaders.mjs';
import Logger from './logger.loaders.mjs';

export default async function ({ expressApp }) {
  const dbConnector = await sequilize();
  Logger.info('DB successfully connected');
  await expressLoader(expressApp, dbConnector);
  Logger.info('Express loaded');
}

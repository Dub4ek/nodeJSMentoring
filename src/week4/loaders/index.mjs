import expressLoader from './express.loaders..mjs';
import sequilize from './sequelize.loaders.mjs';

export default async function ({ expressApp }) {
  const dbConnector = await sequilize();
  await expressLoader(expressApp, dbConnector);
}

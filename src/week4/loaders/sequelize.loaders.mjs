import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export default async function () {
  const sequelizeConnector = new Sequelize(process.env.DATABSE_URL);
  await sequelizeConnector.authenticate();

  return sequelizeConnector;
}

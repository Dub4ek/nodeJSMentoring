import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export default async function () {
  const sequelize = new Sequelize(process.env.DATABSE_URL);
  await sequelize.authenticate();
  return sequelize;
}

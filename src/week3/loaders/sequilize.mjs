import Sequelize from 'sequelize';
import config from 'config';

export default async function() {
  const sequelize = new Sequelize(config.get('DB.uri'));

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
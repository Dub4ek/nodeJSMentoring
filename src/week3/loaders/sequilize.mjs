import Sequelize from 'sequelize';

export default async function() {
  const sequelize = new Sequelize('postgres://postgres:111111@localhost:5433/nodejsMentoring');
  await sequelize.authenticate();

  return sequelize;
}
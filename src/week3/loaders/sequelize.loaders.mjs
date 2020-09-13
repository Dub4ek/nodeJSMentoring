import Sequelize from 'sequelize';

export default async function () {
  const sequelize = new Sequelize(' \tpostgres://vonfvoic:JFKvExVGKDLFoVbr_E1xMHgPudkofrCn@lallah.db.elephantsql.com:5432/vonfvoic');
  await sequelize.authenticate();
  return sequelize;
}

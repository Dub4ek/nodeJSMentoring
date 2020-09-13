import sequelize from 'sequelize';
import sequelizeLoaders from '../loaders/sequelize.loaders.mjs';
import Sequelize from 'sequelize';

const { DataTypes, Model } = sequelize;

class User extends Model {}

export default async function () {
  const sequelizePG = await sequelizeLoaders();

  return User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isdeleted: {
      type: DataTypes.STRING,
      defaultValue: false
    }
  },
  {
    sequelize: sequelizePG,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });
}


import sequelize from 'sequelize';

const { DataTypes, Model } = sequelize;

class User extends Model {}

export default function (dbConnector) {
  return User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.UUIDV4
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
    sequelize: dbConnector,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });
}


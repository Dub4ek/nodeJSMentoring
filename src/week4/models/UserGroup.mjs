import sequelize from 'sequelize';
import sequelizeLoaders from '../loaders/sequelize.loaders.mjs';
import User from './User';
import Group from './Group';

const { DataTypes, Model } = sequelize;

class UserGroup extends Model {}

export default async function () {
  const sequelizePG = await sequelizeLoaders();
  const UserModel = await User();
  const GroupModel = await Group();

  UserModel.belongsToMany(GroupModel, { through: UserGroup });
  GroupModel.belongsToMany(UserModel, { through: UserGroup });

  return UserGroup.init({
    UserId: {
      type: DataTypes.UUID,
      references: {
        model: UserModel,
        key: 'id'
      }
    },
    GroupId: {
      type: DataTypes.UUID,
      references: {
        model: GroupModel,
        key: 'id'
      }
    }
  },
  {
    sequelize: sequelizePG,
    modelName: 'Group',
    tableName: 'groups',
    timestamps: false
  });
}

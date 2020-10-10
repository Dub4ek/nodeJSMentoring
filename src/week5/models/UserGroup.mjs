import sequelize from 'sequelize';
import User from './User.mjs';
import Group from './Group.mjs';

const { DataTypes, Model } = sequelize;

class UserGroup extends Model {}

export default function (dbConnector) {
  const UserModel = User(dbConnector);
  const GroupModel = Group(dbConnector);

  UserGroup.init({
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
    sequelize: dbConnector,
    modelName: 'UserGroup',
    tableName: 'userGroup',
    timestamps: false
  });

  UserModel.belongsToMany(GroupModel, { through: UserGroup });
  GroupModel.belongsToMany(UserModel, { through: UserGroup });

  return UserGroup;
}

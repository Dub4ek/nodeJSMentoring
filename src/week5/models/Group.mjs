import sequelize from 'sequelize';
import GROUP_PERMISSIONS from '../constant/GroupPermissions.constant.mjs';

const { DataTypes, Model } = sequelize;

class Group extends Model {}

export default function (dbConnector) {
  return Group.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.UUIDV4
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      values: [GROUP_PERMISSIONS.READ, GROUP_PERMISSIONS.WRITE, GROUP_PERMISSIONS.DELETE, GROUP_PERMISSIONS.SHARE, GROUP_PERMISSIONS.UPLOAD_FILES]
    }
  },
  {
    sequelize: dbConnector,
    modelName: 'Group',
    tableName: 'groups',
    timestamps: false
  });
}

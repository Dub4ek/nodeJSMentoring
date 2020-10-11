import Group from '../models/Group.mjs';
import sequelize from 'sequelize';
import Logger from '../loaders/logger.loaders.mjs';
import UserGroup from '../models/UserGroup.mjs';

const { Op } = sequelize;

class GroupService {
  constructor(dbConnector) {
    this.groupModel = Group(dbConnector);
    this.userGroupModel = UserGroup(dbConnector);
    this.dbConnector = dbConnector;
  }

  async addGroup(groupDto) {
    Logger.info(`Called addGroup with: ${groupDto}`);
    const transactionMethod = async (transaction) => {
      const result = await this.groupModel.create(groupDto, { transaction });

      return result;
    };

    return await this._getTransaction(transactionMethod);
  }

  async deleteGroup({ id }) {
    Logger.info(`Called deleteGroup with: ${id}`);
    const transactionMethod = async (transaction) => {
      const result = (await this.groupModel.findOne({
        where: {
          id
        }
      }, { transaction })).destroy({ transaction });

      await this.userGroupModel.destroy({
        where: {
          GroupId: id
        }
      }, { transaction });

      return result;
    };

    return await this._getTransaction(transactionMethod);
  }

  async getGroup({ id }) {
    Logger.info(`Called getGroup with: ${id}`);

    return await this.groupModel.findOne({
      where: {
        id
      }
    });
  }

  async updateGroup(group) {
    Logger.info(`Called updateGroup with: ${group}`);
    const transactionMethod = async (transaction) => {
      const result = await this.groupModel.findOne({
        where: {
          id: group.id
        }
      }, { transaction });

      if (result) {
        Object.keys(group).forEach(key => {
          if (group[key]) {
            result[key] = group[key];
          }
        });

        await result.save({ transaction });
      }

      return result;
    };

    return await this._getTransaction(transactionMethod);
  }

  async listGroups({ name = '', limit = 10 }) {
    Logger.info(`Called listGroups with: ${name} ${limit}`);
    return await this.groupModel.findAll({
      where: {
        name: {
          [Op.substring]: name
        }
      },
      order: [['name', 'ASC']],
      limit
    });
  }

  async _getTransaction(method) {
    return await this.dbConnector.transaction(method);
  }
}

export default GroupService;

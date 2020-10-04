import Group from '../models/Group.mjs';
import sequelize from 'sequelize';

const { Op } = sequelize;


class GroupService {
  constructor(dbConnector) {
    this.groupModel = Group(dbConnector);
    this.dbConnector = dbConnector;
  }

  async addGroup(groupDto) {
    const transactionMethod = async (transaction) => {
      const result = await this.groupModel.create(groupDto, { transaction });

      return result;
    };

    return await this._getTransaction(transactionMethod);
  }

  async deleteGroup({ id }) {
    const transactionMethod = async (transaction) => {
      const result = (await this.groupModel.findOne({
        where: {
          id
        }
      }, { transaction })).destroy({ transaction });

      return result;
    };

    return await this._getTransaction(transactionMethod);
  }

  async getGroup({ id }) {
    const transactionMethod = async (transaction) => {
      return await this.groupModel.findOne({
        where: {
          id
        }
      }, { transaction });
    };

    return await this._getTransaction(transactionMethod);
  }

  async updateGroup(group) {
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
    const transactionMethod = async (transaction) => {
      return await this.groupModel.findAll({
        where: {
          name: {
            [Op.substring]: name
          }
        },
        order: [['name', 'ASC']],
        limit
      }, { transaction });
    };

    return await this._getTransaction(transactionMethod);
  }

  async _getTransaction(method) {
    return await this.dbConnector.transaction(method);
  }
}

export default GroupService;

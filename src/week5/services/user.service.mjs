import User from '../models/User.mjs';
import sequelize from 'sequelize';
import UserGroup from '../models/UserGroup.mjs';
import UserGroupDto from '../dto/UserGroup.dto.mjs';
import Logger from '../loaders/logger.loaders.mjs';

const { Op } = sequelize;

class UserService {
  constructor(dbConnector) {
    this.userModel = User(dbConnector);
    this.userGroupModel = UserGroup(dbConnector);
    this.dbConnector = dbConnector;
  }
  async addUser(userDto) {
    Logger.info(`Called addUser with: ${userDto}`);
    const transactionMethod = async (transaction) => {
      const result = await this.userModel.create(userDto, { transaction });

      return result;
    };

    return await this._getTransaction(transactionMethod);
  }

  async getUser({ id }) {
    Logger.info(`Called getUser with: ${id}`);
    const transactionMethod = async (transaction) => {
      const result = await this.userModel.findOne({
        where: {
          id,
          isdeleted: {
            [Op.eq]: false
          }
        }
      }, { transaction });

      return result;
    };

    return await this._getTransaction(transactionMethod);
  }

  async deleteUser({ id }) {
    Logger.info(`Called deleteUser with: ${id}`);
    const transactionMethod = async (transaction) => {
      const result = await this.userModel
        .findOne({
          where: {
            id
          }
        }, { transaction });

      result.isdeleted = true;

      await result.save();
    };
    return await this._getTransaction(transactionMethod);
  }

  async updateUser(user) {
    Logger.info(`Called updateUser with: ${user}`);
    const transactionMethod = async (transaction) => {
      const result = await this.userModel.findOne({
        where: {
          id: user.id,
          isdeleted: {
            [Op.eq]: false
          }
        }
      }, { transaction });

      if (result) {
        Object.keys(user).forEach(key => {
          if (user[key]) {
            result[key] = user[key];
          }
        });

        await result.save();
      }

      return result;
    };

    return await this._getTransaction(transactionMethod);
  }

  async listUsers({ login = '', limit = 10 }) {
    Logger.info(`Called listUsers with: ${login} ${limit}`);
    const transactionMethod = async (transaction) => {
      return await this.userModel.findAll({
        attributes : ['id', 'login', 'password', 'age'],
        where: {
          login: {
            [Op.substring]: login
          },
          isdeleted: {
            [Op.eq]: false
          }
        },
        order: [['login', 'ASC']],
        limit
      }, { transaction });
    };

    return await this._getTransaction(transactionMethod);
  }

  async addUsersToGroup({ groupId, userIds }) {
    Logger.info(`Called addUsersToGroup with: ${groupId} ${userIds}`);
    const userGroupsCollection = userIds.map(item => UserGroupDto.fromObject({
      userId: item,
      groupId
    }));
    const transactionMethod = async (transaction) => {
      const result = await this.userGroupModel.bulkCreate(userGroupsCollection, { transaction });

      return result;
    };

    return await this._getTransaction(transactionMethod);
  }

  async _getTransaction(method) {
    return await this.dbConnector.transaction(method);
  }
}

export default UserService;

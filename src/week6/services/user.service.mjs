import User from '../models/User.mjs';
import sequelize from 'sequelize';
import UserGroup from '../models/UserGroup.mjs';
import UserGroupDto from '../dto/UserGroup.dto.mjs';
import Logger from '../loaders/logger.loaders.mjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

const { Op } = sequelize;

class UserService {
  constructor(dbConnector) {
    this.userModel = User(dbConnector);
    this.userGroupModel = UserGroup(dbConnector);
    this.dbConnector = dbConnector;
  }
  async addUser(userDto) {
    Logger.info(`Called addUser with: ${userDto}`);
    const secret = randomBytes(32);
    const hashedPassword = await argon2.hash(userDto.password, { salt: secret });

    userDto.password = hashedPassword;

    const transactionMethod = async (transaction) => {
      const result = await this.userModel.create(userDto, { transaction });

      return result;
    };

    return await this._getTransaction(transactionMethod);
  }

  async getUser({ id }) {
    Logger.info(`Called getUser with: ${id}`);
    const result = await this.userModel.findOne({
      where: {
        id,
        isdeleted: {
          [Op.eq]: false
        }
      }
    });

    return result;
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
    });
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

  async loginUser({ username, password }) {
    const user = await this.userModel.findOne({
      where: {
        login: username,
        isdeleted: {
          [Op.eq]: false
        }
      }
    });

    if (!user) {
      throw new Error('User don\'t exist');
    }

    const validPassword = await argon2.verify(user.password, password);

    if (validPassword) {
      Logger.info(`Password is valid`);
      const token = this._generateToken(user);

      return { user, token };
    }

    throw new Error('Invalid password');
  }

  async _getTransaction(method) {
    return await this.dbConnector.transaction(method);
  }

  _generateToken(user) {
    const today = new Date();
    const expireDate = new Date(today);

    expireDate.setDate(today.getDate() + 120);

    const tokenData = {
      _id: user.id,
      name: user.login,
      exp: expireDate.getTime() / 1000
    };

    return jwt.sign(tokenData, config.get('Authentication.secret'), { algorithm: config.get("Authentication.algorithms") });
  }
}

export default UserService;

import User from '../models/User.mjs';
import sequelize from 'sequelize';

const { Op } = sequelize;

class UserService {
  async addUser(userDto) {
    const UserModel = await User();

    const result = await UserModel.create(userDto);

    return result;
  }

  async getUser({ id }) {
    const UserModel = await User();

    const result = await UserModel.findOne({
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
    const UserModel = await User();

    const result = await UserModel
      .findOne({
        where: {
          id
        }
      });

    result.isdeleted = true;

    await result.save();
  }

  async updateUser(user) {
    const UserModel = await User();

    const result = await UserModel.findOne({
      where: {
        id: user.id,
        isdeleted: {
          [Op.eq]: false
        }
      }
    });

    if (result) {
      Object.keys(user).forEach(key => {
        if (user[key]) {
          result[key] = user[key];
        }
      });

      await result.save();
    }

    return result;
  }

  async listUsers({ login = '', limit = 10 }) {
    const UserModel = await User();

    const result =  await UserModel.findAll({
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

    return result;
  }
}

export default UserService;

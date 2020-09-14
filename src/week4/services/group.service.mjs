import Group from '../models/Group.mjs';
import sequelize from 'sequelize';

const { Op } = sequelize;


class GroupService {
  async addGroup(groupDto) {
    const GroupModel = await Group();
    const result = await GroupModel.create(groupDto);

    return result;
  }

  async deleteGroup({ id }) {
    const GroupModel = await Group();

    const result = (await GroupModel.findOne({
      where: {
        id
      }
    })).destroy();

    return result;
  }

  async getGroup({ id }) {
    const GroupModel = await Group();

    return await GroupModel.findOne({
      where: {
        id
      }
    });
  }

  async updateGroup(group) {
    const GroupModel = await Group();

    const result = await GroupModel.findOne({
      where: {
        id: group.id
      }
    });

    if (result) {
      Object.keys(group).forEach(key => {
        if (group[key]) {
          result[key] = group[key];
        }
      });

      await result.save();
    }

    return result;
  }

  async listGroups({ name = '', limit = 10 }) {
    const GroupModel = await Group();

    const result = await GroupModel.findAll({
      where: {
        name: {
          [Op.substring]: name
        }
      },
      order: [['name', 'ASC']],
      limit
    });

    return result;
  }
}

export default GroupService;

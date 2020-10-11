export default class UserGroupDto {
  constructor(userId, groupId) {
    this.UserId = userId;
    this.GroupId = groupId;
  }

  static fromObject(data) {
    const result = new UserGroupDto();

    result.UserId = data.userId;
    result.GroupId = data.groupId;

    return result;
  }
}

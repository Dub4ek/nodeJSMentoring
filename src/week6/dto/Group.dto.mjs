export default class GroupDto {
  constructor(id, name, permissions) {
    this.id = id;
    this.name = name;
    this.permissions = permissions;
  }

  static fromObject(data) {
    const result = new GroupDto();

    result.id = data.id;
    result.name = data.name;
    result.permissions = data.permissions;

    return result;
  }
}

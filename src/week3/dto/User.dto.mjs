export default class UserDTO {
  constructor(id, login, password, age, isDeleted = false) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.age = age;
    this.isdeleted = isDeleted;
  }

  static fromObject(data) {
    const result = new UserDTO();

    result.id = data.id;
    result.login = data.login;
    result.password = data.password;
    result.age = data.age;
    result.isdeleted = false;

    return result;
  }
}

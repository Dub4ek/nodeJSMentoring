export default class User {
  constructor(id, login, password, age, isDeleted = false) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = isDeleted;
  }

  static fromObject(data) {
    const result = new User();

    result.id = data.id;
    result.login = data.login;
    result.password = data.password;
    result.age = data.age;
    result.isDeleted = false;

    return result;
  }
}
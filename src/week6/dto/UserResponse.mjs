export default class UserResponse {
  constructor(id, login, password, age) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.age = age;
  }

  static fromObject(data) {
    const result = new UserResponse();

    result.id = data.id;
    result.login = data.login;
    result.password = data.password;
    result.age = data.age;

    return result;
  }
}
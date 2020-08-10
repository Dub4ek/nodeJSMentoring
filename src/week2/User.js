export default class User {
  constructor(id, login, password, age, idDeleted) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.age = age;
    this.idDeleted = idDeleted;
  }
}
import { v4 as uuidv4 } from 'uuid';
import User from './dto/User.mjs';
const storage = new Map();

storage.set('Vasya', new User('46bd339a-9235-419d-b3fb-100ca2efb03e', 'Vasya', '1234', 19));
storage.set('Petya', new User(uuidv4(), 'Petya', '1234', 19));
storage.set('Ignati', new User(uuidv4(), 'Ignati', '1234', 19));

export default class UserStorage {
   addUser(data = {}) {
      const userData = User.fromObject({ id: uuidv4(), ...data});

      storage.set(userData.login, userData);
   }

   getUser(id) {
      const [result] = Array.from(storage.entries()).filter(item => item[1].id === id && !item[1].isDeleted);

      return result[1];
   }

   updateUser(userData = {}) {
      const { id } = userData;
      const user = this._getUserBy('id', id);

      Object.keys(userData).forEach(item => {
         if (Object.prototype.hasOwnProperty.call(user, item)) {
            user[item] = userData[item];
         }
      })

      storage.set(user.login, user);
   }

   deleteUser(id) {
      const removedItem = this._getUserBy('id', id);

      removedItem.isDeleted = true;
      storage.set(removedItem.login, removedItem);
   }
   getAllUsers(login = '', limit = 10) {
      const sortedUsers = Array.from(storage.values())
         .filter(item => item.login.includes(login) && !item.isDeleted)
         .sort((a, b) => {
            if(a.login < b.login) { return -1; }
            if(a.login > b.login) { return 1; }
            return 0;
         });
      return sortedUsers.slice(0, limit);
   }

   _getUserBy(key, value) {
      const [entry = []] = Array.from(storage.values()).filter(item => item[key] === value);

      return entry;
   }
}
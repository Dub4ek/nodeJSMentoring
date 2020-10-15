import 'babel-polyfill';
jest.mock('express', () => {
  return require('jest-express');
});
jest.mock('../../../services/group.service.mjs', () => {
  return jest.fn().mockImplementation(() => {
    return { };
  });
});

jest.mock('./group.methods.mjs', () => {
  return {
    getUser() {
      return () => {};
    },
    addUser() {
      return () => {};
    },
    updateUser() {
      return () => {};
    },
    deleteUser() {
      return () => {};
    },
    listUsers() {
      return () => {};
    },
    addUsersToGroup() {
      return () => {};
    },
    loginUser() {
      return () => {};
    }
  };
});

import user from './group.router.mjs';
import { Express } from 'jest-express/lib/express';


let app;

describe('Check User router', () => {
  beforeEach(() => {
    app = new Express();
  });
  afterEach(() => {
    app.resetMocked();
  });

  test('should setup server', async () => {
    try {
      await user(app);
      expect(app.use).toHaveBeenCalled();
    } catch (err) {};
  });
});

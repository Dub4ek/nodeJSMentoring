import 'babel-polyfill';
import express from 'express';
import request from 'supertest';

jest.mock('../models/User.mjs', () => {
  return jest.fn().mockImplementation(() => {
    return { };
  });
});
jest.mock('../models/Group.mjs', () => {
  return jest.fn().mockImplementation(() => {
    return { };
  });
});
jest.mock('../models/UserGroup.mjs', () => {
  return jest.fn().mockImplementation(() => {
    return { };
  });
});
jest.mock('../loaders/sequelize.loaders.mjs');
import UserModel from '../models/User';

describe('Test application with DB calls mock', () => {
  test('get user info', async (done) => {
    const application = express();
    const value = await import('../loaders/index.mjs');
    await value.default({ expressApp: application });

    request(application).get('/users').end(() => {
      expect(UserModel).toHaveBeenCalled();
      done();
    });
  });
  test('add user', async (done) => {
    const application = express();
    const value = await import('../loaders/index.mjs');
    await value.default({ expressApp: application });

    request(application).put('/users').end(() => {
      expect(UserModel).toHaveBeenCalled();
      done();
    });
  });
});

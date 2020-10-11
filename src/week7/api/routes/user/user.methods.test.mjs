import 'babel-polyfill';
jest.mock('../../../services/user.service.mjs');
import { getUser, loginUser } from './user.methods';
import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';

let request;
let response;

describe('Check user methods', () => {
  beforeEach(() => {
    request = new Request();
    response = new Response();
  });

  afterEach(() => {
    request.resetMocked();
    response.resetMocked();
  });
  describe('get user', () => {
    const userDataStub = {
      id: 'test',
      login: 'login',
      password: 'test',
      age: 15
    };

    test('Next with error should be called', async (done) => {
      const userServiceMock = jest.fn();
      userServiceMock.mockImplementation(() => ({
        async getUser() {
          return Promise.resolve(userDataStub);
        }
      }));
      const result = getUser(userServiceMock);
      const next = jest.fn(() => done());

      await result(request, response, next);
      expect(next).toHaveBeenCalled();
    });
    test('User with data should be called', async (done) => {
      const userServiceMock = jest.fn();
      userServiceMock.mockImplementation(() => ({
        async getUser() {
          return Promise.resolve(userDataStub);
        }
      }));
      const result = getUser(userServiceMock);
      const next = jest.fn(() => done());
      request.body = {
        id: '11111'
      };
      try {
        await result(request, response, next);
        expect(response.body).toMatchObject(userDataStub);
      } catch (err) {
      }
    });
    test('Error occured', async (done) => {
      const userServiceMock = jest.fn();
      userServiceMock.mockImplementation(() => ({
        async getUser() {
          return Promise.reject();
        }
      }));
      const result = getUser(userServiceMock);
      const next = jest.fn(() => done());
      request.body = {
        id: '11111'
      };
      try {
        await result(request, response, next);
        expect(next).toHaveBeenCalled();
      } catch (err) {
      }
    });
  });
  describe('login user', () => {
    const userLoginStub = {
      username: 'Vasya',
      password: '111111'
    };

    const userDataStub = {
      id: 'test',
      login: 'login',
      password: 'test',
      age: 15
    };

    const successLoginData = {
      user: userDataStub,
      token: '111'
    };

    test('Next with error should be called', async (done) => {
      const userServiceMock = jest.fn();
      userServiceMock.mockImplementation(() => ({
        async loginUser() {
          return Promise.resolve(userLoginStub);
        }
      }));
      const result = loginUser(userServiceMock);
      const next = jest.fn(() => done());

      await result(request, response, next);
      expect(next).toHaveBeenCalled();
    });
    test('User with data should be logged', async (done) => {
      const userServiceMock = jest.fn();
      userServiceMock.mockImplementation(() => ({
        async loginUser() {
          return Promise.resolve(successLoginData);
        }
      }));
      const result = getUser(userServiceMock);
      const next = jest.fn(() => done());
      request.body = userLoginStub;
      try {
        await result(request, response, next);
        expect(response.body).toMatchObject(successLoginData);
      } catch (err) {
      }
    });
    test('Error occured', async (done) => {
      const userServiceMock = jest.fn();
      userServiceMock.mockImplementation(() => ({
        async loginUser() {
          return Promise.reject();
        }
      }));
      const result = getUser(userServiceMock);
      const next = jest.fn(() => done());
      request.body = userLoginStub;
      try {
        await result(request, response, next);
        expect(next).toHaveBeenCalled();
      } catch (err) {
      }
    });
  });
});

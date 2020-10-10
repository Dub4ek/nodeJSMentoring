import jwt from 'express-jwt';
import config from 'config';

function getToken(req) {
  const [authType = '', token = null] = req.headers.authorization ? req.headers.authorization.split(' ') : [];

  if (/Token|Bearer/.test(authType)) {
    return token;
  }

  return null;
}

export const isAuthorised = jwt({
  secret: config.get("Authentication.secret"),
  algorithms: [config.get("Authentication.algorithms")],
  userProperty: 'token',
  getToken
});

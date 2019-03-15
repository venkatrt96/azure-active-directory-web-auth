const login = require('./login');

exports.bind = (app) => {
  app.use('/', login);
};
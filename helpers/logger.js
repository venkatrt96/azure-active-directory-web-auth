const includes = require('lodash/includes');
const moment = require('moment');

const requestLogger = (request, statusCode, response, error) => {
  const {
    method, url, headers,
  } = request;
  let fontColor = '';
  if (includes([200], statusCode)) {
    fontColor = '\x1b[32m';
  } else if (includes([201, 202, 204, 301, 302, 303, 304, 307, 400, 401, 405, 409, 415, 429], statusCode)) {
    fontColor = '\x1b[33m';
  } else if (includes([403, 404, 406, 500, 501, 503], statusCode)) {
    fontColor = '\x1b[31m';
  }

  const log = `\x1b[30m${moment().toDate()} - Status: ${fontColor}${statusCode}
  \x1b[30m${method} request to ${url}
  Headers: ${JSON.stringify(headers)}
  `;

  console.log(!error ? log
    : `${log}${fontColor}${JSON.stringify(error)}
  `);
};

module.exports = { requestLogger };

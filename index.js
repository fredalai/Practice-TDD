const constants = require('./constants');
const url = require('url');

module.exports = function (data) {
  const { method, url: dataUrl = '' } = data;
  const urlObj = url.parse(dataUrl);
  if (method !== constants.GET) {
    return data;
  }

  if (urlObj.pathname === '/domain/users') {
    urlObj.pathname = '/api/domain/users';
    data.url = url.format(urlObj);
  }

  return data;
}

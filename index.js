const url = require('url');

module.exports = function (data) {
  const { url: dataUrl = '' } = data;
  const urlObj = url.parse(dataUrl);
  if (urlObj.pathname === '/domain/users') {
    urlObj.pathname = '/api/domain/users';
    data.url = url.format(urlObj);
  }

  return data;
}

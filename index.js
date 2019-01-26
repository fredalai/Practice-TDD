const constants = require('./constants');
const url = require('url');

module.exports = function (config) {
  return function (data) {
    const { method, url: dataUrl = '' } = data;
    const urlObj = url.parse(dataUrl);

    if (config && config.method) {
      if (!config.method.includes(method)) {
        return data;
      }

      if (config.pathname && config.newPathname) {
        if (urlObj.pathname !== config.pathname) {
          return data;
        }

        urlObj.pathname = config.newPathname;
        data.url = url.format(urlObj);
        return data;
      }

      if (urlObj.pathname !== '/domain/users') {
        return data;
      }

      urlObj.pathname = '/api/domain/users';
      data.url = url.format(urlObj);
      return data;
    }

    if (method !== constants.GET) {
      return data;
    }

    if (urlObj.pathname === '/domain/users') {
      urlObj.pathname = '/api/domain/users';
      data.url = url.format(urlObj);
    }

    return data;
  };
}

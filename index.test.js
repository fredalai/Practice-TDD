const constants = require('./constants');
const rule = require('./index');

const { DELETE, GET, POST, PUT } = constants;
const getObjDataByConfig = (config = {}) => {
  const obj = {
    url: 'http://www.aroundyourlife.com/test',
    method: GET,
    headers: {
      Cookie: 'name=value; name2=value2',
      'Content-Type': 'application/json',
    }
  };

  return {
    ...obj,
    ...config,
  };
};

describe('Rule 1', () => {
  describe('Scenario 1 - Check the function', () => {
    it('Scenario 1 - input and output are object type', () => {
      const obj = getObjDataByConfig();
      const result = rule()(obj);

      expect(result).toEqual({
        url: 'http://www.aroundyourlife.com/test',
        method: GET,
        headers: {
          Cookie: 'name=value; name2=value2',
          'Content-Type': 'application/json',
        }
      });
    });
  });

  describe('Scenario 2 - Execute main task when method is GET', () => {
    const obj = getObjDataByConfig({
      url: 'http://www.aroundyourlife.com/domain/users',
    });
    const result = rule()(obj);

    it('Update URL path name /api/domain/users instead of /domain/users', () => {
      expect(result.url).toBe('http://www.aroundyourlife.com/api/domain/users');
    });

    it('Execute the function if method is GET', () => {
      expect(result.method).toBe(GET);
    });
  });

  describe('Scenario 3 - Check POST/PUT/DELETE method should not be execute main task', () => {
    it('Should not be execute main task if method is POST', () => {
      const url = 'http://www.aroundyourlife.com/domain/users';
      const obj = getObjDataByConfig({
        method: POST,
        url,
      });
      const result = rule()(obj);

      expect(result.url).toBe(url);
      expect(result.method).toBe(POST);
    });

    it('Should not be execute main task if method is PUT', () => {
      const url = 'http://www.aroundyourlife.com/domain/users';
      const obj = getObjDataByConfig({
        method: PUT,
        url,
      });
      const result = rule()(obj);

      expect(result.url).toBe(url);
      expect(result.method).toBe(PUT);
    });

    it('Should not be execute main task if method is DELETE', () => {
      const url = 'http://www.aroundyourlife.com/domain/users';
      const obj = getObjDataByConfig({
        method: DELETE,
        url,
      });
      const result = rule()(obj);

      expect(result.url).toBe(url);
      expect(result.method).toBe(DELETE);
    });
  });

  describe('Scenario 4 - Add customize config', () => {
    it('Allow execute main task if config is empty obj', () => {
      const obj = getObjDataByConfig();
      const config = {};
      const ruleWithConfig = rule(config);
      const result = ruleWithConfig(obj);

      expect(result).toEqual(obj);
    });
  });
});

const constants = require('./constants');
const rule = require('./index');

const { GET } = constants;
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
      const result = rule(obj);

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
    const result = rule(obj);

    it('Update URL path name /api/domain/users instead of /domain/users', () => {
      expect(result.url).toBe('http://www.aroundyourlife.com/api/domain/users');
    });

    it('Execute the function if method is GET', () => {
      expect(result.method).toBe(GET);
    });
  });
});

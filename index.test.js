const rule = require('./index');

const getObjDataByConfig = (config = {}) => {
  const obj = {
    url: 'http://www.aroundyourlife.com/test',
    method: 'GET',
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
  it('Scenario 1 - input and output are object type', () => {
    const obj = getObjDataByConfig();
    const result = rule(obj);

    expect(result).toBe(obj);
  });
});

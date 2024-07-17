const env = require('../env');
const { EnvironmentError } = require('../custom-errors');

const BooleanMap = {
  true: true,
  false: false,
}

/**
 *
 * @param {string} key
 */
module.exports = function boolean(key) {
  const rawValue = env(key);

  const booleanValue = BooleanMap[rawValue]

  if (typeof booleanValue !== 'boolean') {
    throw new EnvironmentError(`Environment variable for key '${key}' is not a boolean. Actual value is '${rawValue}'`);
  }

  return booleanValue;
};

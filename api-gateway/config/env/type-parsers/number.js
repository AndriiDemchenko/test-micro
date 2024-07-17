const _ = require('lodash');
const { EnvironmentError } = require('../custom-errors');
const env = require('../env');

/**
 *
 * @param {string} key
 */
module.exports = function number(key) {
  const value = +env(key);

  if (!_.isNumber(value)) {
    throw new EnvironmentError(`Environment variable for key '${key}' is not a number`);
  }

  return value;
};

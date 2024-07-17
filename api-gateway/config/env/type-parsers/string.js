const env = require('../env');

/**
 *
 * @param {string} key
 */
module.exports = function string(key) {
  return env(key);
};

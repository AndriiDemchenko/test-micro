const { EnvironmentError } = require('./custom-errors');

/**
 *
 * @param {string} key
 */
function env(key) {
  const value = process.env[key];

  if (value == null) {
    throw new EnvironmentError(`Environment variable for key '${key}' is missing`);
  }

  return value;
}

module.exports = env;

const env = require('../env');
const { EnvironmentError } = require('../custom-errors');

function parseValue(value) {
  try {
    return JSON.parse(value);
  } catch (err) {
    throw new EnvironmentError(`Cannot parse value. Native message: ${err.message}`);
  }
}

/**
 * @param {string} key
 * @returns {string[]}
 */
module.exports = function arrayOfStrings(key) {
  const str = env(key);

  const parsedStr = parseValue(str);
  if (!Array.isArray(parsedStr)) {
    throw new EnvironmentError(`${key} value is not an array`);
  }

  for (const el of parsedStr) {
    if (typeof el !== 'string') {
      throw new EnvironmentError(`Error while parsing array of strings. '${el}' is not a string, but ${typeof el}`);
    }
  }

  return parsedStr;
};

const { string, number, arrayOfStrings, boolean } = require('./type-parsers');

const env = Object.freeze({
  string,
  number,
  boolean,
  arrayOfStrings,
});

module.exports = env;

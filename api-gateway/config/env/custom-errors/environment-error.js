const ERROR_PREFIX = '[EnvironmentError]'

class EnvironmentError extends Error {
  constructor(msg) {
    msg = `${ERROR_PREFIX}: ${msg}`;
    super(msg);
  }
}

module.exports = { EnvironmentError };

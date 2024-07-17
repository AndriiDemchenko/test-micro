module.exports = {
  ...require('./rate-limit.middleware'),
  ...require('./timeout.middleware'),
}

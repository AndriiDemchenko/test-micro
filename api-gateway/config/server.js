const env = require('./env')

module.exports = {
  PORT: env.string('PORT'),
  IS_DOCKER: env.boolean('IS_DOCKER'),
}

const { IS_DOCKER } = require('./server')

module.exports = {
  SERVICES: Object.freeze([
    {
      route: '/auth',
      target: IS_DOCKER
        ? 'http://auth-service:5001/auth'
        : 'http://localhost:5001/auth',
    },
    {
      route: '/conflicts',
      target: IS_DOCKER
        ? 'http://conflict-service:5002/conflicts'
        : 'http://localhost:5002/conflicts',
    },
    {
      route: '/surveys',
      target: IS_DOCKER
        ? 'http://survey-service:5003/surveys'
        : 'http://localhost:5003/surveys',
    },
  ]),
}

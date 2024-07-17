const { responseTemplate } = require('../app/response-template')

const { TIMEOUT_CONFIG } = require('../config/middleware')

function timeoutMiddleware(req, res, next) {
  req.setTimeout(TIMEOUT_CONFIG.TIMEOUT_MS, () => {
    res.status(504).json(
      responseTemplate({
        code: 504,
        status: 'Error',
        message: 'Gateway timeout',
        data: null,
      })
    )

    req.abort()
  })

  next()
}

module.exports = { timeoutMiddleware }

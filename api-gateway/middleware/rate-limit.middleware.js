const { responseTemplate } = require('../app/response-template')

const { RATE_LIMIT_CONFIG } = require('../config/middleware')

/**
 * @type {{
 *  [ip: string]: number
 * }}
 */
let requestCounts = {}

// Reset request count for each IP address
setInterval(() => {
  requestCounts = {}
}, RATE_LIMIT_CONFIG.INTERVAL_MS)

function rateLimitMiddleware(req, res, next) {
  const ip = req.ip

  requestCounts[ip] = (requestCounts[ip] || 0) + 1

  if (requestCounts[ip] > RATE_LIMIT_CONFIG.NAX_REQUESTS) {
    return res.status(429).json(
      responseTemplate({
        code: 429,
        status: 'Error',
        message: 'Rate limit exceeded',
        data: null,
      })
    )
  }

  next()
}

module.exports = { rateLimitMiddleware }

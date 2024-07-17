require('dotenv').config({ path: '.env' })

const express = require('express')
const cors = require('cors')
const helmet = require('helmet').default
const morgan = require('morgan')
const { createProxyMiddleware } = require('http-proxy-middleware')

const { responseTemplate } = require('./app/response-template')
const { rateLimitMiddleware, timeoutMiddleware } = require('./middleware')

const { PORT } = require('./config/server')
const { SERVICES } = require('./config/services')

function bootstrap() {
  const app = express()

  // Enable CORS
  app.use(cors())

  // Add security headers
  app.use(helmet())

  // Log HTTP requests
  app.use(morgan('tiny'))

  // Hide Express server information
  app.disable('x-powered-by')

  // Apply the rate limit and timeout middleware to the proxy
  app.use(rateLimitMiddleware)
  app.use(timeoutMiddleware)

  // Set up proxy middleware for each microservice
  SERVICES.forEach(({ route, target }) => {
    // Proxy options
    const proxyOptions = {
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^${route}`]: '',
      },
    }

    app.use(
      route,
      rateLimitMiddleware,
      timeoutMiddleware,
      createProxyMiddleware(proxyOptions)
    )
  })

  app.use((_req, res) => {
    res.status(404).json(
      responseTemplate({
        code: 404,
        status: 'Error',
        message: 'Route not found.',
        data: null,
      })
    )
  })

  // Start Express server
  app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`)
  })
}

module.exports = {
  start() {
    bootstrap()
  },
}

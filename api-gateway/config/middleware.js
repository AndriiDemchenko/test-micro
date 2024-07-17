module.exports = {
  TIMEOUT_CONFIG: {
    // Request timeout before 504
    TIMEOUT_MS: 15_000,
  },
  RATE_LIMIT_CONFIG: {
    // Max requests per interval
    NAX_REQUESTS: 200,
    INTERVAL_MS: 60 * 1000,
  },
}

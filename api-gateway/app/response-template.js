module.exports = {
  /**
   *
   * @param {{
   *  code: number
   *  status: string
   *  message: string
   *  data: any
   * }} payload
   */
  responseTemplate({ code, status, message, data }) {
    return {
      code,
      status,
      message,
      data,
    }
  },
}

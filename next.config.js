const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = phase => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER

  const env = {
    RESTURL_SHOE: (() => {
      if (isDev) return 'http://localhost:4000/'
    })()
  }
  return {
    env
  }
}

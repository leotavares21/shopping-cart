const {
  PHASE_PRODUCTION_BUILD,
  PHASE_DEVELOPMENT_SERVER
} = require('next/constants')

module.exports = phase => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  const env = {
    RESTURL_SHOE: (() => {
      if (isDev) return 'http://localhost:4000/'
      if (isProd) return 'https://air-jordan-35-api.herokuapp.com/'
      if (isStaging) return 'http://localhost:11639'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    RESTURL_SESSIONS: (() => {
      if (isDev) return 'http://localhost:4000/'
      if (isProd) return 'https://www.siliconvalley-codecamp.com/rest/sessions'
      if (isStaging) return 'http://localhost:11639'
      return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })()
  }
  return {
    env
  }
}

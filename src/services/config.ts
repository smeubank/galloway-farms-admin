const medusaUrl = __MEDUSA_BACKEND_URL__ || "http://localhost:9000"
const sentryDSN = __SENTRY_DSN__ || ""
const sentryDebug = __SENTRY_DEBUG__ || ""

export { sentryDSN, sentryDebug, medusaUrl }

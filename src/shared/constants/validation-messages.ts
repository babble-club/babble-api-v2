export const ValidationMessages = {
  APP_CONFIG: {
    VALID: 'Application configuration is valid and accessible',
    EMPTY: 'Application configuration is empty',
    FETCH_FAILED: 'Failed to fetch application configuration',
    UNKNOWN_ERROR: 'An unknown error occurred',
  },
  SYSTEM_READINESS_VERIFIER: {
    SUCCESS: 'System is ready',
    CHECK_PASSED: (component: string) => `${component} readiness check passed`,
    CHECK_FAILED: (component: string, reason: string) =>
      `${component} readiness check failed: ${reason}`,
    UNEXPECTED_ERROR: (message: string) => `Unexpected readiness verification error: ${message}`,
  },
  AUTHORIZATION: {
    INVALID_TOKEN: 'Invalid token',
    UNAUTHORIZED: 'Unauthorized',
    VALID_TOKEN: 'Valid token',
    MISSING_AUTH_HEADER: 'Missing authorization header',
    TOKEN_PARSING_FAILED: 'Token parsing failed',
  },
  HTTP: {
    INTERNAL_SERVER_ERROR: 'Internal server error',
  },
  AUTHENTICATION: {
    FAILED: 'Authentication failed',
  },
  DATABASE: {
    CONNECTION_ESTABLISHED: 'Database connection established',
    CONNECTION_CLOSED: 'Database connection closed',
    CONNECTION_FAILED: 'Database connection failed:',
    DISCONNECTION_ERROR: 'Error disconnecting database:',
    NOT_CONNECTED: 'Database is not connected. Call connect() before using it.',
    FAILED_TO_ESTABLISH: 'Failed to establish database connection',
    FAILED_TO_CLOSE: 'Failed to close database connection',
  },
} as const;

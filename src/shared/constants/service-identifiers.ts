export const ServiceIdentifiers = {
  APP_CONFIG_PROVIDER: 'AppConfigProvider',
  SYSTEM_READINESS_VERIFIER: 'SystemReadinessVerifier',
  DATABASE_TOKEN_GENERATOR: 'DatabaseTokenGenerator',
} as const;

export type ServiceIdentifierType = (typeof ServiceIdentifiers)[keyof typeof ServiceIdentifiers];

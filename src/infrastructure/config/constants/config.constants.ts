export const CONFIG_CONSTANTS = {
  CACHE_DURATION_MS: 300_000, // 5 minutes
  LOCAL_ENV: 'local',
} as const;

export const APP_CONFIG_ERRORS = {
  FETCH_FAILED: (message: string) => `Failed to fetch app config: ${message}`,
} as const;

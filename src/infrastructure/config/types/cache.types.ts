export interface ConfigCache<AppConfigSchema> {
  readonly value: AppConfigSchema | null;
  readonly expiresAt: number;
}

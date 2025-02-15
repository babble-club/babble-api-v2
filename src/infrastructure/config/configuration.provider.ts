import type { ConfigProvider } from '@/domain/interfaces/config-provider.interface';
import type { BabbleApiServiceAppConfig } from './app-config.types';
import { ConfigCache } from '@/infrastructure/config/cache/config-cache';
import type { ConfigSource } from '@/domain/interfaces/config-source.interface';
import { CONFIG_CONSTANTS } from './constants/config.constants';
import { APP_CONFIG_ERRORS } from './constants/config.constants';
import { ValidationMessages } from '@/shared/constants/validation-messages';

/**
 * Provides application configuration via a selected ConfigSource with caching.
 */
export class AppConfigProvider implements ConfigProvider {
  private readonly cache: ConfigCache<BabbleApiServiceAppConfig>;
  private readonly configSource: ConfigSource;

  constructor(configSource: ConfigSource, cacheTtlMs: number = CONFIG_CONSTANTS.CACHE_DURATION_MS) {
    this.configSource = configSource;
    this.cache = new ConfigCache(cacheTtlMs);
  }

  /**
   * Gets configuration either from cache or by fetching fresh.
   * @throws {Error} When config fetch fails.
   */
  public async getConfig(): Promise<BabbleApiServiceAppConfig> {
    try {
      const cachedConfig = this.cache.get();
      if (cachedConfig) return cachedConfig;

      const newConfig = await this.configSource.fetch();
      this.cache.set(newConfig);
      return newConfig;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : ValidationMessages.APP_CONFIG.UNKNOWN_ERROR;
      throw new Error(APP_CONFIG_ERRORS.FETCH_FAILED(errorMessage));
    }
  }
}

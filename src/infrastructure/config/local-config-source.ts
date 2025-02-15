import type { ConfigSource } from '@/domain/interfaces/config-source.interface';
import type { BabbleApiServiceAppConfig } from './app-config.types';
import localAppConfig from '@/shared/app-config-local';
import { APP_CONFIG_ERRORS } from './constants/config.constants';
import { ValidationMessages } from '@/shared/constants/validation-messages';

/**
 * Provides application configuration from local file source.
 * Used primarily for development and testing environments.
 */
export class LocalConfigSource implements ConfigSource {
  async fetch(): Promise<BabbleApiServiceAppConfig> {
    try {
      return localAppConfig as BabbleApiServiceAppConfig;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : ValidationMessages.APP_CONFIG.UNKNOWN_ERROR;
      throw new Error(APP_CONFIG_ERRORS.FETCH_FAILED(errorMessage));
    }
  }
}

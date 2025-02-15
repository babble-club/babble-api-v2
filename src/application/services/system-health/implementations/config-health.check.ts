import type { ConfigProvider } from '@/domain/interfaces/config-provider.interface';
import type { SystemReadinessCheck } from '../interfaces/health-check.interface';
import { ValidationMessages } from '@/shared/constants/validation-messages';
import { Result } from '@/shared/utils/result.utils';
import type { BabbleApiServiceAppConfig } from '@/infrastructure/config/app-config.types';

/**
 * Checks if the application configuration is available and valid.
 * Fails the readiness check if fetching the configuration fails or returns empty configuration.
 */
export class ApplicationConfigurationReadinessCheck implements SystemReadinessCheck {
  constructor(private readonly configProvider: ConfigProvider) {}

  async verifyReadiness(): Promise<Result<string>> {
    try {
      const config = await this.configProvider.getConfig();
      return this.isConfigValid(config)
        ? Result.ok(ValidationMessages.APP_CONFIG.VALID)
        : Result.fail(ValidationMessages.APP_CONFIG.EMPTY);
    } catch (_error) {
      return Result.fail(ValidationMessages.APP_CONFIG.FETCH_FAILED);
    }
  }

  private isConfigValid(config: BabbleApiServiceAppConfig): boolean {
    return config && Object.keys(config).length > 0;
  }
}

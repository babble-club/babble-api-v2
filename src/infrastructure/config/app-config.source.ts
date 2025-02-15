import { getAppConfig } from '@invenco-cloud-systems-ics/ics-library-appconfig';
import type { ConfigSource } from '@/domain/interfaces/config-source.interface';
import type { BabbleApiServiceAppConfig } from './app-config.types';
import { APP_CONFIG_ERRORS } from './constants/config.constants';
import { ValidationMessages } from '@/shared/constants/validation-messages';
import type { AppConfigParams } from './types/app-config-params.types';

export class AwsAppConfigSource implements ConfigSource {
  private readonly appParams: AppConfigParams;

  constructor(appIdentifier: string, environment: string, configProfile: string) {
    this.appParams = {
      ApplicationIdentifier: appIdentifier,
      EnvironmentIdentifier: environment,
      ConfigurationProfileIdentifier: `${environment}-${configProfile}`,
    };
  }

  async fetch(): Promise<BabbleApiServiceAppConfig> {
    try {
      const response = await getAppConfig({
        aws: { appParams: this.appParams },
        local: false,
      });
      return response as unknown as BabbleApiServiceAppConfig;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : ValidationMessages.APP_CONFIG.UNKNOWN_ERROR;
      throw new Error(APP_CONFIG_ERRORS.FETCH_FAILED(errorMessage));
    }
  }
}

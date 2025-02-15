import type { BabbleApiServiceAppConfig } from '../../infrastructure/config/app-config.types';

export interface ConfigProvider {
  getConfig(): Promise<BabbleApiServiceAppConfig>;
}

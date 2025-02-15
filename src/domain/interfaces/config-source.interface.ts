import type { BabbleApiServiceAppConfig } from '@/infrastructure/config/app-config.types';

export interface ConfigSource {
  fetch(): Promise<BabbleApiServiceAppConfig>;
}

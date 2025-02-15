import type { PostgresDbAppConfig } from '@/infrastructure/config/app-config.types';
import type { DatabaseAuthCredentials } from '@/shared/types/database-auth-credentials.types';

export interface DatabaseAuthStrategy {
  getAuthCredentials(dbAppConfig: PostgresDbAppConfig): Promise<DatabaseAuthCredentials>;
}

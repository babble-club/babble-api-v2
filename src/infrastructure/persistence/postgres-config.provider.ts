import type { DatabaseAuthStrategy } from '@/domain/interfaces/database-auth-strategy.interface';
import type { PostgresPoolConfigProvider } from '@/domain/interfaces/postgres-pool-config-provider.interface';
import type { PostgresDbAppConfig } from '@/infrastructure/config/app-config.types';
import type { DatabaseAuthCredentials } from '@/shared/types/database-auth-credentials.types';
import type { PoolConfig } from 'pg';

export class PostgresConfigProvider implements PostgresPoolConfigProvider {
  constructor(
    // instead of passing the dbAppConfig, we can also pas the AppConfigProvider, and perform lazy fetching when getConfig is called?
    // :thoughts?
    private readonly dbAppConfig: PostgresDbAppConfig,
    private readonly dbAuthStrategy: DatabaseAuthStrategy
  ) {}

  async getConfig(): Promise<PoolConfig> {
    const databaseAuthCredentials = await this.dbAuthStrategy.getAuthCredentials(this.dbAppConfig);
    const dbConfig: PostgresDbAppConfig = {
      ...this.dbAppConfig,
      username: databaseAuthCredentials.username,
      password: databaseAuthCredentials.password,
    };

    // shoule we move this to a util function?
    return this.createPoolConfig(dbConfig, databaseAuthCredentials);
  }

  private createPoolConfig(
    dbConfig: PostgresDbAppConfig,
    authCredentials: DatabaseAuthCredentials
  ): PoolConfig {
    return {
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.database,
      user: authCredentials.username,
      password: authCredentials.password,
      ssl: dbConfig.ssl,
      max: dbConfig.connection_pool.max,
      idleTimeoutMillis: dbConfig.connection_pool.idle_timeout_ms,
      min: dbConfig.connection_pool.min,
    };
  }
}

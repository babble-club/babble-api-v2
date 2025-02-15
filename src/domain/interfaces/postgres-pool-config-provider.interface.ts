import type { PoolConfig } from 'pg';

export interface PostgresPoolConfigProvider {
  getConfig(): Promise<PoolConfig>;
}

import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

export interface DatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getConnection(): NodePgDatabase;
}

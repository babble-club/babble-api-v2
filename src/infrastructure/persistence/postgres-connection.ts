import { Pool } from 'pg';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { drizzle } from 'drizzle-orm/node-postgres';
import { ValidationMessages } from '@/shared/constants/validation-messages';
import type { DatabaseConnection } from '@/domain/interfaces/database-connection.interface';
import type { PostgresConfigProvider } from './postgres-config.provider';

const DB_VALIDATION_MESSAGES = ValidationMessages.DATABASE;

/**
 * Manages a single connection to a PostgreSQL database using connection pooling and Drizzle ORM.
 * This class ensures only one database connection instance exists throughout the application (Singleton pattern).
 * It handles connecting to and disconnecting from the database, and provides access to the Drizzle database object for performing queries.
 */
export class PostgresConnection implements DatabaseConnection {
  private static instance: PostgresConnection;
  private client!: NodePgDatabase;
  private connectionPool!: Pool;

  private constructor(private readonly postgresConfigProvider: PostgresConfigProvider) {}

  public static getInstance(postgresConfigProvider: PostgresConfigProvider): PostgresConnection {
    if (!PostgresConnection.instance) {
      PostgresConnection.instance = new PostgresConnection(postgresConfigProvider);
    }
    return PostgresConnection.instance;
  }

  public async connect(): Promise<void> {
    try {
      const databasePoolConfiguration = await this.postgresConfigProvider.getConfig();

      this.connectionPool = new Pool(databasePoolConfiguration);
      this.client = drizzle(this.connectionPool);

      // Validate connection by running a simple query
      await this.connectionPool.query('SELECT 1');

      console.info(DB_VALIDATION_MESSAGES.CONNECTION_ESTABLISHED);
    } catch (connectionError) {
      console.error(DB_VALIDATION_MESSAGES.CONNECTION_FAILED, connectionError);
      throw new Error(DB_VALIDATION_MESSAGES.FAILED_TO_ESTABLISH);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.connectionPool.end();
      console.info(DB_VALIDATION_MESSAGES.CONNECTION_CLOSED);
    } catch (disconnectionError) {
      console.error(DB_VALIDATION_MESSAGES.DISCONNECTION_ERROR, disconnectionError);
      throw new Error(DB_VALIDATION_MESSAGES.FAILED_TO_CLOSE);
    }
  }

  public getConnection<T extends Record<string, unknown>>(): NodePgDatabase<T> {
    if (!this.client) {
      throw new Error(DB_VALIDATION_MESSAGES.NOT_CONNECTED);
    }
    return this.client as unknown as NodePgDatabase<T>;
  }
}

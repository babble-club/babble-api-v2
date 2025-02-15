import type { DatabaseAuthStrategy } from '@/domain/interfaces/database-auth-strategy.interface';
import type { DatabaseTokenGenerator } from '@/domain/interfaces/auth/database-token-generator.interface';
import type { PostgresDbAppConfig } from '@/infrastructure/config/app-config.types';
import type { DatabaseAuthCredentials } from '@/shared/types/database-auth-credentials.types';

/**
 * This strategy is used to authenticate with a password.
 * It relies on the username and password being set in the app config.
 */
export class PasswordAuthStrategy implements DatabaseAuthStrategy {
  constructor(private readonly dbAppConfig: PostgresDbAppConfig) {}

  async getAuthCredentials(): Promise<DatabaseAuthCredentials> {
    return {
      username: this.dbAppConfig.username,
      password: this.dbAppConfig.password,
    };
  }
}

/**
 * This strategy is used to authenticate with an IAM token.
 * It relies on generating an IAM token from the AWS RDS Signer service.
 */
export class IamAuthStrategy implements DatabaseAuthStrategy {
  constructor(
    private readonly dbAppConfig: PostgresDbAppConfig,
    private readonly tokenGenerator: DatabaseTokenGenerator
  ) {}

  async getAuthCredentials(): Promise<DatabaseAuthCredentials> {
    const token = await this.tokenGenerator.generateToken({
      hostname: this.dbAppConfig.host,
      port: this.dbAppConfig.port,
      username: this.dbAppConfig.username,
      region: this.dbAppConfig.region,
    });

    return { username: this.dbAppConfig.username, password: token };
  }
}

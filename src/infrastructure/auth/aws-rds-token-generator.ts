import { Signer } from '@aws-sdk/rds-signer';
import type {
  DatabaseTokenGenerator,
  DatabaseTokenConfig,
} from '@/domain/interfaces/database-token-generator.interface';

export class AwsRdsTokenGenerator implements DatabaseTokenGenerator {
  async generateToken(config: DatabaseTokenConfig): Promise<string> {
    const signer = new Signer({
      hostname: config.hostname,
      port: config.port,
      username: config.username,
      region: config.region,
    });

    return signer.getAuthToken();
  }
}

export interface DatabaseTokenGenerator {
  generateToken(config: DatabaseTokenConfig): Promise<string>;
}

export interface DatabaseTokenConfig {
  hostname: string;
  port: number;
  username: string;
  region: string;
}

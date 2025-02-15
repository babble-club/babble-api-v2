export interface PostgresDbAppConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  region: string;
  connection_pool: {
    min: number;
    max: number;
    idle_timeout_ms: number;
  };
  ssl: boolean;
}

export interface JwtAuthConfig {
  jwt: {
    public_key: string;
    algorithms: string;
    issuer: string;
  };
}

export interface BabbleDbConfig {
  babbleDev: PostgresDbAppConfig;
}

export interface BabbleApiServiceAppConfig {
  environment: string;
  database: BabbleDbConfig;
  auth: JwtAuthConfig;
}

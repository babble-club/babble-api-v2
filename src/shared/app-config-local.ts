const localAppConfig = {
  environment: 'local',
  database: {
    babbleDev: {
      host: 'localhost',
      port: 5432,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      region: process.env.AWS_REGION,
      connection_pool: {
        min: 1,
        max: 2,
        idle_timeout_ms: 10000,
      },
      ssl: false,
    },
  },
  auth: {
    jwt: {
      public_key: process.env.JWT_PUBLIC_KEY,
      algorithms: 'RS256',
      issuer: 'LOCAL - Babble Club',
    },
  },
};

export default localAppConfig;

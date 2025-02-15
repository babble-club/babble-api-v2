import type { ServiceLocator } from '@/shared/utils/service-locator.utils';
import { Environment } from '@/shared/environment';
import { ServiceIdentifiers } from '@/shared/constants/service-identifiers';
import { SystemReadinessVerifier } from '@/application/services/system-readiness-verifier.service';
import { ApplicationConfigurationReadinessCheck } from '@/application/services/system-health/implementations/config-health.check';
import { PostgresConnection } from '@/infrastructure/persistence/postgres-connection';
import {
  IamAuthStrategy,
  PasswordAuthStrategy,
} from '@/infrastructure/auth/database-auth-strategy';
import { PostgresConfigProvider } from '@/infrastructure/persistence/postgres-config.provider';
// import { PostgresCouponRepository } from '@/infrastructure/persistence/postgres-coupon.repository';
import type { AppConfigParams } from '@/infrastructure/config/types/app-config-params.types';
import { LocalConfigSource } from '@/infrastructure/config/local-config-source';
import { AppConfigProvider } from '@/infrastructure/config/configuration.provider';

export const setupDependencies = async (serviceLocator: ServiceLocator): Promise<void> => {
  // Initialize config sources and providers
  const localConfigSource = new LocalConfigSource();

  // TODO: To be brought up when other config sources are available
  // const appConfigSource = Environment.isLocal() ? localConfigSource : awsConfigSource;
  const appConfigSource = localConfigSource;

  const appConfigProvider = new AppConfigProvider(appConfigSource);
  const appConfig = await appConfigProvider.getConfig();

  // Initialize database connection
  const dbAuthStrategy = Environment.isLocal()
    ? new PasswordAuthStrategy(appConfig.database.babbleDev)
    : new IamAuthStrategy(
        appConfig.database.babbleDev,
        serviceLocator.get(ServiceIdentifiers.DATABASE_TOKEN_GENERATOR)
      );

  const postgresConfigProvider = new PostgresConfigProvider(
    appConfig.database.babbleDev,
    dbAuthStrategy
  );

  const postgresConnection = PostgresConnection.getInstance(postgresConfigProvider);
  await postgresConnection.connect();

  // Register all services at once
  serviceLocator.registerAll({
    [ServiceIdentifiers.APP_CONFIG_PROVIDER]: appConfigProvider,
    [ServiceIdentifiers.SYSTEM_READINESS_VERIFIER]: new SystemReadinessVerifier([
      new ApplicationConfigurationReadinessCheck(appConfigProvider),
    ]),
    // [ServiceIdentifiers.COUPON_REPOSITORY]: new PostgresCouponRepository(postgresConnection),
  });
};

import type { ServiceLocator } from '@/shared/utils/service-locator.utils';
import { LocalConfigSource } from '@/infrastructure/config/local-config-source';
import { AwsAppConfigSource } from '@/infrastructure/config/app-config.source';
import { AppConfigProvider } from '@/infrastructure/config/configuration.provider';
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
import { PostgresCouponRepository } from '@/infrastructure/persistence/postgres-coupon.repository';
import type { AppConfigParams } from '@/infrastructure/config/types/app-config-params.types';

export const setupDependencies = async (serviceLocator: ServiceLocator): Promise<void> => {
  // Initialize config sources and providers
  const localConfigSource = new LocalConfigSource();
  const appConfigParams = {
    ApplicationIdentifier: process.env.APP_IDENTIFIER as string,
    EnvironmentIdentifier: process.env.ENVIRONMENT as string,
    ConfigurationProfileIdentifier: process.env.CONFIG_PROFILE as string,
  } as AppConfigParams;

  const awsConfigSource = new AwsAppConfigSource(
    appConfigParams.ApplicationIdentifier,
    appConfigParams.EnvironmentIdentifier,
    appConfigParams.ConfigurationProfileIdentifier
  );

  const appConfigSource = Environment.isLocal() ? localConfigSource : awsConfigSource;

  const appConfigProvider = new AppConfigProvider(appConfigSource);
  const appConfig = await appConfigProvider.getConfig();

  // Initialize database connection
  const dbAuthStrategy = Environment.isLocal()
    ? new PasswordAuthStrategy(appConfig.database.playlist)
    : new IamAuthStrategy(
        appConfig.database.playlist,
        serviceLocator.get(ServiceIdentifiers.DATABASE_TOKEN_GENERATOR)
      );

  const postgresConfigProvider = new PostgresConfigProvider(
    appConfig.database.playlist,
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
    [ServiceIdentifiers.COUPON_REPOSITORY]: new PostgresCouponRepository(postgresConnection),
  });
};

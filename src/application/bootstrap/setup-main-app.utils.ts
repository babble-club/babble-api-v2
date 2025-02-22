// External dependencies
import express from 'express';
import cors from 'cors';

import requestHandlerMiddleware from '@/interface/middleware/request-handler.middleware';
import errorHandlerMiddleware from '@/interface/middleware/error-handler.middleware';

// Application bootstrap
import { setupDependencies } from '@/application/bootstrap/setup-dependencies.utils';
import { verifySystemReadiness } from '@/application/bootstrap/verify-system-readiness.utils';
import type { SystemReadinessVerifier } from '@/application/services/system-readiness-verifier.service';

// Shared utilities and constants
import AppLogger from '@/shared/utils/app-logger.utils';
import { getDotEnv } from '@/shared/utils/dot-env-provider.utils';
import { ServiceLocator } from '@/shared/utils/service-locator.utils';
import { ServiceIdentifiers } from '@/shared/constants/service-identifiers';
import { Routes } from './routes.utils';

export const setupApp = async () => {
  const logger = new AppLogger(__filename).child({
    filepath: __filename,
  });
  // Seting up all dependencies
  const serviceLocator = ServiceLocator.getInstance();
  await setupDependencies(serviceLocator);

  // Checking if everything's ready
  const systemReadinessVerifier = serviceLocator.get<SystemReadinessVerifier>(
    ServiceIdentifiers.SYSTEM_READINESS_VERIFIER
  );

  await verifySystemReadiness(systemReadinessVerifier);

  const app = express();

  const corsOptions = {
    origin: getDotEnv('CORS_ORIGIN') as string,
    maxAge: getDotEnv('CORS_MAX_AGE') as number,
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  // app.use(helmet());
  app.use(requestHandlerMiddleware);
  app.use(errorHandlerMiddleware);

  const routes = new Routes();
  routes.v1(app);

  app.get('/health', (req, res) => {
    logger.debug(req, 'health check');
    res.status(200).send('ok');
  });

  return app;
};

// External dependencies
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';

// Application bootstrap
import { setupDependencies } from '@/application/bootstrap/setup-dependencies.utils';
import { verifySystemReadiness } from '@/application/bootstrap/verify-system-readiness.utils';

// Application services and commands
// import { CreateCouponCommand } from '@/application/commands/create-coupon.command';
// import type { SystemReadinessVerifier } from '@/application/services/system-readiness-verifier.service';

// // Interface layer
// import { CouponController } from '@/interface/http/controllers/v1/coupon.controller';
import { errorHandler } from '@/interface/middleware/error-handler';
import { swaggerConfig } from '@/interface/openapi/swagger.config';

// // Shared utilities and constants
import { ServiceLocator } from '@/shared/utils/service-locator.utils';
import AppLogger from '@/shared/utils/app-logger.utils';
// import { ServiceIdentifiers } from '@/shared/constants/service-identifiers';

const logger = new AppLogger(__filename).child({
  filepath: __filename,
});

export const setupApp = async (): Promise<Elysia> => {
  // Seting up all dependencies
  const serviceLocator = ServiceLocator.getInstance();
  logger.debug(serviceLocator, 'serviceLocator');
  await setupDependencies(serviceLocator);

  // Checking if everything's ready
  // const systemReadinessVerifier = serviceLocator.get<SystemReadinessVerifier>(
  // ServiceIdentifiers.SYSTEM_READINESS_VERIFIER
  // );

  // await verifySystemReadiness(systemReadinessVerifier);

  // const createCouponCommand = new CreateCouponCommand(
  //   serviceLocator.get(ServiceIdentifiers.COUPON_REPOSITORY)
  // );

  // Setting up the app finally
  const app = new Elysia()
    .onError(({ error, set }) => {
      logger.error('Error caught:', error);
      set.status = 400;
      return {
        error: {
          message: error instanceof Error ? error.message : 'Unknown error',
          code: (error as any).code || 'VALIDATION_ERROR',
        },
      };
    })
    .use(cors())
    .use(errorHandler())
    .use(swagger({ documentation: swaggerConfig }));

  // Change from new Elysia to group
  app.group('/api/v1', (app) => {
    // new CouponController(app, createCouponCommand);
    return app;
  });

  console.log(
    'Registered Routes:',
    app.routes.map((r) => `${r.method} ${r.path}`)
  );

  return app;
};

import type { Application } from 'express';
import { API_VER } from '@/shared/constants/common';
import { useExpressServer } from 'routing-controllers';
import AppLogger from '@/shared/utils/app-logger.utils';
// import isAuthorized from '@middlewares/auth.middleware';
// import { AuthController } from '@modulesV1/auth/auth.controller';

export class Routes {
  private logger;

  constructor() {
    this.logger = new AppLogger(__filename).child({
      filepath: __filename,
    });
  }

  public v1(app: Application) {
    const basePath = `/api/${API_VER}`;
    this.logger.info(basePath, 'Routes | v1 | basePath');
    useExpressServer(app, {
      controllers: [
        // AuthController,
      ], // we specify controllers we want to use
      middlewares: [
        // isAuthorized
      ],
      defaultErrorHandler: false,
      routePrefix: basePath,
    });
  }
}

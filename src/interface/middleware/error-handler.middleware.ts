import type { NextFunction, Request, Response } from 'express';
import HttpErrorProvider from '@/shared/utils/http-error.provider';
import { HttpStatusCode } from '@/interface/http/constants/http-status';
import { getDotEnv } from '@/shared/utils/dot-env-provider.utils';
import AppLogger from '@/shared/utils/app-logger.utils';

export default (error: Error, request: Request, response: Response, next: NextFunction) => {
  const logger = new AppLogger(__filename).child({
    filepath: __filename,
  });
  if (error instanceof HttpErrorProvider) {
    const httpError = error as HttpErrorProvider;
    response.status(httpError.status).send({
      message: httpError.message,
      errors: httpError.error,
      data: httpError.body,
    });
    return next();
  }
  logger.error(error);
  response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
    error: (getDotEnv('PASS_ERRORS_TO_CLIENTS') as string)
      ? error.message
      : request.context.translate('somethingBadHappened'),
    data: null,
  });
  return next();
};

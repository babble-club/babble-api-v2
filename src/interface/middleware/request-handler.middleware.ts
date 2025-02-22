import AppLogger from '@/shared/utils/app-logger.utils';
import type { NextFunction, Request, Response } from 'express';

export default (request: Request, response: Response, next: NextFunction): void => {
  const logger = new AppLogger(__filename).child({
    filepath: __filename,
  });
  // const startTime = Date.now();
  // const endTime = Date.now();
  request.on('close', () => {
    logger.info('on close');
    // logger.info(
    //   {
    //     startTime,
    //     path: request.path,
    //     query: request.query,
    //     params: request.params,
    //     context: request.context,
    //     headers: request.headers,
    //     body: request.body as Buffer
    //   },
    //   'Request'
    // );
  });
  response.on('finish', () => {
    logger.info('on finish');

    // logger.info(
    //   {
    //     endTime,
    //     duration: endTime - startTime,
    //     status: {
    //       code: response.statusCode,
    //       message: response.statusMessage
    //     },
    //     locals: response.locals,
    //     headers: response.getHeaders()
    //   },
    //   'Response'
    // );
  });

  // biome-ignore lint/correctness/noVoidTypeReturn: <explanation>
  return next();
};

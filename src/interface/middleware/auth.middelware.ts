import type { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../http/constants/http-status';
import { type BabbleJwtPayload, JWTUtil } from '@/shared/utils/jwt.utils';
import AppLogger from '@/shared/utils/app-logger.utils';
import HttpResponseProvider from '../http/response/http-response.provider';
import type { ContextualRequest } from '@/domain/interfaces/auth.interface';

const resProvider = new HttpResponseProvider();
const logger = new AppLogger(__filename).child({
  filepath: __filename,
});

export default async function isAuthorized(
  req: ContextualRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const jwt = new JWTUtil();
    const token = req.header('authorization');
    logger.debug({ token }, 'isAuthorised | token');
    let decodedToken: BabbleJwtPayload | undefined;
    if (token) {
      logger.debug({ token }, 'isAuthorised | going to verify token');
      decodedToken = jwt.verifyToken(token) as unknown as BabbleJwtPayload;
    } else {
      logger.info({}, 'isAuthorised | verify token: MISSING TOKEN');
      const authRes = resProvider.generate(HttpStatusCode.UNAUTHORIZED, 'auth', {}, '', '1');
      return res.status(authRes.code).json(authRes.json);
    }
    req.context = { ...req.context, ...decodedToken?.data };
    return next();
  } catch (error) {
    logger.info({ error }, 'isAuthorised | verify token: FAILED');
    const authRes = resProvider.generate(HttpStatusCode.UNAUTHORIZED, 'auth', {}, '', '1');
    return res.status(authRes.code).json(authRes.json);
  }
}

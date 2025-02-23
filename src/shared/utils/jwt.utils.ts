import jwt, { type Secret, type JwtPayload } from 'jsonwebtoken';
import { getDotEnv } from './dot-env-provider.utils';
import type { Parent } from '@/domain/entities/parent/parent';

import { Result } from '@/shared/utils/result.utils';
import { ValidationMessages } from '@/shared/constants/validation-messages';

import AppLogger from '@/shared/utils/app-logger.utils';
import { OperationsUtils } from './operations.utils';

export type babbleJwtPayload = Partial<Parent>;

export interface BabbleJwtPayload extends JwtPayload {
  data: babbleJwtPayload;
}

export class JWTUtil {
  private readonly jwtSecret = getDotEnv('JWT_SECRET') ?? '';
  private utils = new OperationsUtils();
  private logger;

  constructor() {
    this.logger = new AppLogger(__filename).child({
      filepath: __filename,
    });
  }

  public generateToken(
    data: babbleJwtPayload,
    secureKeys: (keyof Parent)[] = [],
    _tokenLife = '864000'
  ): string | null {
    this.logger.debug({ data, secureKeys }, 'jwtProvider | generateToken | BEFORE jwt.sign | data');
    const payload = this.utils.removeKeys(data, secureKeys);
    try {
      return jwt.sign({ data: payload }, this.jwtSecret as Secret, {
        algorithm: 'HS256',
        // expiresIn: tokenLife
      });
    } catch (error) {
      this.logger.error({ error }, 'jwtProvider | generateToken | error');
      return null;
    }
  }

  public verifyToken(token: string) {
    try {
      const jwtPayload = jwt.verify(token, this.jwtSecret as Secret);
      return Result.ok(jwtPayload);
    } catch (error) {
      console.error(error);
      return Result.fail(ValidationMessages.AUTHENTICATION.FAILED);
    }
  }
}

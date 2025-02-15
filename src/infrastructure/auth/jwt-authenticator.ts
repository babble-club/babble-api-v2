import type { Authenticator } from '@/domain/interfaces/auth.interface';
import type { ICSUser } from '@/shared/types/auth.types';
import { Result } from '@/shared/utils/result.utils';
import { ValidationMessages } from '@/shared/constants/validation-messages';
import type { verify } from 'jsonwebtoken';

/**
 * @description Verifies user identity by decoding JWT tokens using a public key.
 * Provides a result indicating successful authentication or an error message.
 */
export class JwtAuthenticator implements Authenticator {
  constructor(
    private readonly publicKey: string,
    private readonly verifyJwt: typeof verify
  ) {}

  authenticate(token: string): Result<ICSUser> {
    try {
      const jwtPayload = this.verifyJwt(token, this.publicKey) as ICSUser;
      return Result.ok(jwtPayload);
    } catch (error) {
      console.error(error);
      return Result.fail(ValidationMessages.AUTHENTICATION.FAILED);
    }
  }
}

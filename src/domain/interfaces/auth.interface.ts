import type { Result } from '@/shared/utils/result.utils';
import type { ICSUser } from '@/shared/types/auth.types';

export interface Authenticator {
  authenticate(token: string): Result<ICSUser>;
}

export interface Authorizer {
  authorize(user: ICSUser, requiredRoles: string[]): Result<boolean>;
}

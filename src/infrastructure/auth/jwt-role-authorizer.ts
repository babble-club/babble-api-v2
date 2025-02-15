import type { Authorizer } from '@/domain/interfaces/auth.interface';
import type { ICSUser } from '@/shared/types/auth.types';
import { Result } from '@/shared/utils/result.utils';
import { ValidationMessages } from '@/shared/constants/validation-messages';
import type { ICS_ROLES } from '@/shared/constants/ics-roles.constants';

/**
 * @description Enforces role-based access by validating if users has at least one required role.
 * Converts role checks into Result<boolean> with success states or permission-denied errors.
 */
export class RoleAuthorizer implements Authorizer {
  authorize(user: ICSUser, requiredRoles: ICS_ROLES[]): Result<boolean> {
    return this.hasAtLeastOneRequiredRole(user, requiredRoles)
      ? Result.ok(true)
      : Result.fail(ValidationMessages.AUTHORIZATION.UNAUTHORIZED);
  }

  private hasAtLeastOneRequiredRole(user: ICSUser, requiredRoles: ICS_ROLES[]): boolean {
    const userRoles = user?.roles ?? [];
    return Array.isArray(userRoles) && requiredRoles.some((role) => userRoles.includes(role));
  }
}

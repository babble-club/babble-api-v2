import { Result } from '@/shared/utils/result.utils';
import { ValidationMessages } from '@/shared/constants/validation-messages';
import type { SystemReadinessCheck } from './system-health/interfaces/health-check.interface';

/**
 * Ensures all critical system components are operational before declaring system readiness.
 */
export class SystemReadinessVerifier {
  private readonly readinessChecks: SystemReadinessCheck[];

  constructor(readinessChecks: SystemReadinessCheck[]) {
    this.readinessChecks = readinessChecks;
  }

  async verifyAllReadinessChecks(): Promise<Result<string>> {
    try {
      for (const readinessCheck of this.readinessChecks) {
        const checkName = this.extractCheckName(readinessCheck);
        // TODO: tech debt: perform below check with a timeout, as we don't want to wait indefinitely for a check to complete
        const readinessStatus = await readinessCheck.verifyReadiness();

        if (!readinessStatus.isSuccess()) {
          return this.createReadinessFailureResult(checkName, readinessStatus.getError());
        }
        console.log(ValidationMessages.SYSTEM_READINESS_VERIFIER.CHECK_PASSED(checkName));
      }
      return Result.ok(ValidationMessages.SYSTEM_READINESS_VERIFIER.SUCCESS);
    } catch (error) {
      return this.createUnexpectedFailureResult(error as Error);
    }
  }

  private extractCheckName(check: SystemReadinessCheck): string {
    return check.constructor.name;
  }

  private createReadinessFailureResult(checkName: string, reason: string): Result<string> {
    return Result.fail(
      ValidationMessages.SYSTEM_READINESS_VERIFIER.CHECK_FAILED(checkName, reason)
    );
  }

  private createUnexpectedFailureResult(error: Error): Result<string> {
    return Result.fail(
      ValidationMessages.SYSTEM_READINESS_VERIFIER.UNEXPECTED_ERROR(error.message)
    );
  }
}

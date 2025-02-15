import { ValidationMessages } from '@/shared/constants/validation-messages';
import type { SystemReadinessVerifier } from '@/application/services/system-readiness-verifier.service';

export const verifySystemReadiness = async (
  systemReadinessVerifier: SystemReadinessVerifier
): Promise<void> => {
  const result = await systemReadinessVerifier.verifyAllReadinessChecks();

  if (!result.isSuccess()) {
    console.error(ValidationMessages.SYSTEM_READINESS_VERIFIER.CHECK_FAILED, result.getError());
    process.exit(1);
  }

  console.log('System readiness verification successful');
};

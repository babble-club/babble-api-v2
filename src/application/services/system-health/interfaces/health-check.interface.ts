import type { Result } from '@/shared/utils/result.utils';

export interface SystemReadinessCheck {
  verifyReadiness(): Promise<Result<string>>;
}

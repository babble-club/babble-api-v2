import { Result } from '@/shared/utils/result.utils';
import type { UpdateParentInput } from './types/update-parent.types';
import { Parent } from '@/domain/entities/parent/parent';
import type { ParentRepository } from '@/domain/interfaces/repositories/parent.repository';

export class UpdateParentCommand {
  constructor(private readonly parentRepo: ParentRepository) {}

  async execute(command: UpdateParentInput): Promise<Result<Parent>> {
    try {
      const parent = new Parent(
        command.id,
        command.name,
        command.email,
        command.mobileNo,
        command.age,
        command.gender,
        command.dob,
        command.city,
        command.state,
        command.country,
        command.postalCode,
        command.otp,
        command.otpExpiry,
        command.status,
        command.createdAt,
        command.updatedAt,
        command.deletedAt
      );
      return this.parentRepo.update(command.id, parent);
    } catch (error: unknown) {
      return Result.fail(error instanceof Error ? error.message : String(error));
    }
  }
}

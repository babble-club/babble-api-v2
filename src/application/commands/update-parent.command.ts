import { Parent } from '@/domain/entities/parent/parent';
import type { ParentRepository } from '@/domain/interfaces/repositories/parent.repository';
import type { UpdateParentInput } from '@/application/commands/types/update-parent.types';
import type { Result } from '@/shared/utils/result.utils';

export class UpdateParentCommand {
  constructor(private readonly parentRepo: ParentRepository) {}

  async execute(command: UpdateParentInput): Promise<Result<Parent>> {
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
  }
}

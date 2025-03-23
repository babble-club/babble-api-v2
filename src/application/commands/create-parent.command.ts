import { Parent } from '@/domain/entities/parent/parent';
import type { ParentRepository } from '@/domain/interfaces/repositories/parent.repository';
import type { CreateParentInput } from '@/application/commands/types/create-parent.types';
import type { Result } from '@/shared/utils/result.utils';

export class CreateParentCommand {
  constructor(private readonly parentRepo: ParentRepository) {}

  async execute(command: CreateParentInput): Promise<Result<Parent>> {
    const parent = new Parent(
      crypto.randomUUID(),
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
    return this.parentRepo.save(parent);
  }
}

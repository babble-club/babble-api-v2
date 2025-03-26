// get-parent.command.ts
import { Result } from '@/shared/utils/result.utils';
import type { Parent } from '@/domain/entities/parent/parent';
import type { ParentRepository } from '@/domain/interfaces/repositories/parent.repository';
import type { GetParentInput } from './types/get-parent.types';

export class GetParentCommand {
  constructor(private readonly parentRepo: ParentRepository) {}

  async execute(command: GetParentInput): Promise<Result<Parent>> {
    try {
      const parent = await this.parentRepo.findById(command.parentId);
      if (!parent) {
        return Result.fail('Parent not found');
      }
      return Result.ok(parent);
    } catch (error: unknown) {
      return Result.fail(error instanceof Error ? error.message : String(error));
    }
  }
}

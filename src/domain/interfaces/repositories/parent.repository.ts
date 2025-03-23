import type { Parent } from '@/domain/entities/parent/parent';
import type { Result } from '@/shared/utils/result.utils';

export interface ParentRepository {
  findById(id: string): Promise<Parent | null>;
  findByMobileNo(mobileNo: string): Promise<Parent | null>;
  save(parent: Parent): Promise<Result<Parent>>;
  update(id: string, parent: Parent): Promise<Result<Parent>>;
  softDelete(id: string, userId: string): Promise<Result<Parent>>;
  hardDelete(id: string, userId: string): Promise<Result<Parent>>;
  findDeleted(): Promise<Parent[]>;
  restore(id: string): Promise<Result<Parent>>;
}

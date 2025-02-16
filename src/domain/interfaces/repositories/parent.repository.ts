import type { Parent } from '@/domain/entities/parent/parent';

export interface ParentRepository {
  findById(id: string): Promise<Parent | null>;
  findByContentAssetId(assetId: string): Promise<Parent | null>;
  save(parent: Parent): Promise<void>;
  update(id: string, parent: Parent): Promise<void>;
  softDelete(id: string, userId: string): Promise<void>;
  findDeleted(): Promise<Parent[]>;
  restore(id: string): Promise<void>;
}

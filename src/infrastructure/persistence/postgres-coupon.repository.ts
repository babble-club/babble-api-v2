import type { ParentRepository } from '@/domain/interfaces/repositories/parent.repository';
import type { Parent } from '@/domain/entities/parent/parent';
import type { PostgresConnection } from './postgres-connection';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { parents } from './schemas/parent.schema';
import { eq, isNotNull } from 'drizzle-orm';
import { toEntity, toDatabase } from './mappers/parent.mapper';
import type { ParentRow } from './schemas/parent.schema';

export class PgParentRepository implements ParentRepository {
  private db: NodePgDatabase<{ parents: typeof parents }>;

  constructor(private readonly dbConnection: PostgresConnection) {
    this.db = this.dbConnection.getConnection();
  }

  async findById(id: string): Promise<Parent | null> {
    const result = (await this.db.query.parents.findFirst({
      where: eq(parents.id, Number.parseInt(id, 10)),
    })) as ParentRow;
    return result ? toEntity(result) : null;
  }

  async findByContentAssetId(assetId: string): Promise<Parent | null> {
    const result = (await this.db.query.parents.findFirst({
      where: eq(parents.contentAssetId, assetId),
    })) as ParentRow | null;
    return result ? toEntity(result) : null;
  }

  async save(parent: Parent): Promise<void> {
    const parentData = toDatabase(parent);
    await this.db.insert(parents).values(parentData);
  }

  async update(id: string, parent: Parent): Promise<void> {
    const parentData = toDatabase(parent);
    await this.db
      .update(parents)
      .set(parentData)
      .where(eq(parents.id, Number.parseInt(id, 10)));
  }

  async softDelete(id: string, userId: string): Promise<void> {
    await this.db
      .update(parents)
      .set({ deletedBy: userId, deletedAt: new Date() } as any)
      .where(eq(parents.id, Number.parseInt(id, 10)));
  }

  async findDeleted(): Promise<Parent[]> {
    const rows = (await this.db.query.parents.findMany({
      where: isNotNull(parents.deletedAt),
    })) as ParentRow[];
    return rows.map((row: ParentRow) => toEntity(row));
  }

  async restore(id: string): Promise<void> {
    await this.db
      .update(parents)
      .set({ deletedBy: null, deletedAt: null } as any)
      .where(eq(parents.id, Number.parseInt(id, 10)));
  }
}

import type { CouponRepository } from '../../domain/interfaces/coupon.repository';
import type { Coupon } from '../../domain/entities/coupon/coupon';
import type { PostgresConnection } from './postgres-connection';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { coupons } from './schemas/coupon.schema';
import { eq, isNotNull } from 'drizzle-orm';
import { toEntity, toDatabase } from './mappers/coupon.mapper';
import type { CouponRow } from './schemas/coupon.schema';

export class PostgresCouponRepository implements CouponRepository {
  private db: NodePgDatabase<{ coupons: typeof coupons }>;

  constructor(private readonly dbConnection: PostgresConnection) {
    this.db = this.dbConnection.getConnection();
  }

  async findById(id: string): Promise<Coupon | null> {
    const result = (await this.db.query.coupons.findFirst({
      where: eq(coupons.id, Number.parseInt(id, 10)),
    })) as CouponRow;
    return result ? toEntity(result) : null;
  }

  async findByContentAssetId(assetId: string): Promise<Coupon | null> {
    const result = (await this.db.query.coupons.findFirst({
      where: eq(coupons.contentAssetId, assetId),
    })) as CouponRow | null;
    return result ? toEntity(result) : null;
  }

  async save(coupon: Coupon): Promise<void> {
    const couponData = toDatabase(coupon);
    await this.db.insert(coupons).values(couponData);
  }

  async update(id: string, coupon: Coupon): Promise<void> {
    const couponData = toDatabase(coupon);
    await this.db
      .update(coupons)
      .set(couponData)
      .where(eq(coupons.id, Number.parseInt(id, 10)));
  }

  async softDelete(id: string, userId: string): Promise<void> {
    await this.db
      .update(coupons)
      .set({ deletedBy: userId, deletedAt: new Date() } as any)
      .where(eq(coupons.id, Number.parseInt(id, 10)));
  }

  async findDeleted(): Promise<Coupon[]> {
    const rows = (await this.db.query.coupons.findMany({
      where: isNotNull(coupons.deletedAt),
    })) as CouponRow[];
    return rows.map((row: CouponRow) => toEntity(row));
  }

  async restore(id: string): Promise<void> {
    await this.db
      .update(coupons)
      .set({ deletedBy: null, deletedAt: null } as any)
      .where(eq(coupons.id, Number.parseInt(id, 10)));
  }
}

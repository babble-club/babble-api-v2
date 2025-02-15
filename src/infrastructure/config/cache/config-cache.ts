import type { CacheEntry } from './interface/cache-entry.interface';

/**
 * ConfigCache is a simple in-memory cache that stores a value for a limited time.
 * The value expires after a given time-to-live (TTL) in milliseconds.
 */
export class ConfigCache<T> {
  private entry?: CacheEntry<T>;

  private readonly ttlMs: number;

  constructor(ttlMs: number) {
    this.ttlMs = ttlMs;
  }

  get(): T | null {
    if (!this.entry || this.isExpired(this.entry)) {
      return null;
    }
    return this.entry.value;
  }

  set(value: T): void {
    this.entry = {
      value,
      expiresAt: this.calculateFutureExpiryTimeMs(),
    };
  }

  private isExpired(entry: CacheEntry<T>): boolean {
    return Date.now() > entry.expiresAt;
  }

  private calculateFutureExpiryTimeMs(): number {
    return Date.now() + this.ttlMs;
  }
}

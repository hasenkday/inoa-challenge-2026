export type CacheEntry<T> = {
  value: T
  expiresAt: number
}

export class Cache<T> {
  private entry: CacheEntry<T> | null = null

  constructor(private readonly ttlMs: number) {}

  get(): T | undefined {
    if (!this.entry) return undefined
    if (Date.now() > this.entry.expiresAt) {
      this.entry = null
      return undefined
    }
    return this.entry.value
  }

  set(value: T) {
    this.entry = {
      value,
      expiresAt: Date.now() + this.ttlMs,
    }
  }

  clear() {
    this.entry = null
  }
}

export class KeyedCache<T> {
  private store = new Map<string, CacheEntry<T>>()

  constructor(private readonly ttlMs: number) {}

  get(key: string): T | undefined {
    const entry = this.store.get(key)
    if (!entry) return undefined
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key)
      return undefined
    }
    return entry.value
  }

  set(key: string, value: T) {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + this.ttlMs,
    })
  }

  clear(key?: string) {
    if (key) this.store.delete(key)
    else this.store.clear()
  }
}

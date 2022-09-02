import { SetStorage } from '@/data/protocols/cache';

export class LocalStorageAdapter implements SetStorage {
  async set(key: string, value: unknown): Promise<void> {
    localStorage.setItem(key, String(value));
  }
}

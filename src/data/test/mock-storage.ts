import { SetStorage } from '@/data/protocols/cache';

export class SetStorageSpy implements SetStorage {
  key: string;
  value: unknown;
  async set(key: string, value: unknown): Promise<void> {
    this.key = key;
    this.value = value;
  }
}

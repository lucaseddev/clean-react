import 'jest-localstorage-mock';
import { faker } from '@faker-js/faker';
import { LocalStorageAdapter } from './local-storage-adapter';

type SutTypes = {
  sut: LocalStorageAdapter;
};

const makeSut = (): SutTypes => ({ sut: new LocalStorageAdapter() });

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Should call localStorage with correct values', async () => {
    const { sut } = makeSut();
    const key = faker.database.column();
    const value = faker.random.word();

    await sut.set(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });
});

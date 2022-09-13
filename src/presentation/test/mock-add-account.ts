import { AddAccount, AddAccountParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();
  callsCount = 0;
  params: AddAccountParams;

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.callsCount += 1;
    this.params = params;
    return this.account;
  }
}

import { AccountModel } from "../models/account-model";

export type AuthenticationParams = {
  email: string;
  passowrd: string;
};

export interface Authentication {
  auth(params: AuthenticationParams): Promise<AccountModel>;
}

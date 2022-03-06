import { AccountModel } from "../models/account-model";

type AuthenticationParams = {
  email: string;
  passowrd: string;
};

export interface Authentication {
  auth(params: AuthenticationParams): Promise<AccountModel>;
}

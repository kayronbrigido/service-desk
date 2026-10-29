import { Account } from "@src/models/account";
import { getInstance } from "../axios";

export type GetMyAccountResponse = Account

export async function getMyAccount(): Promise<GetMyAccountResponse> {
  const api = getInstance();
  const { data } = await api.get<GetMyAccountResponse>("/accounts/my-account");

  return data;
}

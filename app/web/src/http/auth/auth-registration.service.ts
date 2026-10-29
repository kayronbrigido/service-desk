import { AuthResponse, CreateAuthDto } from "@src/models/auth";
import { getInstance } from "../axios";

export async function authRegistrationUser(payload: CreateAuthDto): Promise<AuthResponse> {
  const api = getInstance();
  const { data } = await api.post<AuthResponse>("/auth/", payload);

  return data;
}


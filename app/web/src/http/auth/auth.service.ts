import { AuthPayload, AuthResponse } from "@src/models/auth";
import { getInstance } from "../axios";

export async function authenticateUser(payload: AuthPayload): Promise<AuthResponse> {
  const api = getInstance();
  const { data } = await api.post<AuthResponse>("/auth/login", payload);

  await fetch('/api/auth/callback', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return data;
}


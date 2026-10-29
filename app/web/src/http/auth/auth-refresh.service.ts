import { AuthResponse } from "@src/models/auth";
import { getInstance } from "../axios";

export async function refreshtoken(refreshToken: string): Promise<AuthResponse> {
  try {
    const api = getInstance();
    const { data } = await api.post<AuthResponse>("/auth/refresh", { refreshToken });

    return data;
  } catch (error) {
    return { 
      user: {
        id: "",
        name: "",
        email: ""
      },
      expired: true
    }
  }

}


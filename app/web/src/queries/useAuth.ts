import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "@src/http/auth/auth.service";
import { AuthPayload, AuthResponse } from "@src/models/auth";

export function useAuth() {
  return useMutation<AuthResponse, Error, AuthPayload>({
    mutationFn: authenticateUser,
  });
}

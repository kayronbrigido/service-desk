'use client'

import { authenticateUser } from "@src/http/auth/auth.service";
import { getMyAccount } from "@src/http/account/get-my-account";
import { Account } from "@src/models/account";
import { User } from "@src/models/users";
import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { AuthPayload } from "@src/models/auth";


interface AuthContextType {
  user: User | null;
  account: Account | null
  isLoggedIn: boolean;
  login: (payload: AuthPayload) => Promise<void>;
  logout: () => Promise<void>;
  setAccount: Dispatch<SetStateAction<Account | null>>
  setUser: Dispatch<SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const isLoggedIn = !!account;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accountData = await getMyAccount();

        if (accountData) {
          setAccount(accountData);
        }
      } catch (err) {
      }
    };
    fetchUser();
  }, []);

  const login = async (payload: AuthPayload) => {
    await authenticateUser(payload);
    const accountData = await getMyAccount()
    setAccount(accountData);
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }); // rota server-side que limpa os cookies
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, login, logout, account, setAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook de conveniência
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

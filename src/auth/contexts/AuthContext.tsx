/* eslint-disable react-refresh/only-export-components */

import { createContext, useMemo, useState, type ReactNode } from "react";
import { AuthRepository } from "../repository/AuthRepository";
import { apiClient } from "@/lib/ApiClient";
import type {
  LoginRequest,
  SignUpRequest,
  UserInfo,
  SignInResponse,
} from "../AuthDto";

interface AuthContextType {
  user: UserInfo | null;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<SignInResponse>;
  signUp: (data: SignUpRequest) => Promise<UserInfo>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const authRepository = useMemo(() => new AuthRepository(apiClient), []);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await authRepository.login(data.email, data.password);
      setUser(response.user);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: SignUpRequest) => {
    setIsLoading(true);
    try {
      return await authRepository.signUp(
        data.email,
        data.password,
        data.nickname,
        data.phoneNumber,
        data.name
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    //TODO: 서버 API 생성되면 추가
    cookieStore.delete("SASEUM_SESSION");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

import type { HttpClient } from "@/lib/ApiClient.type";
import type { SignInResponse, UserInfo } from "../AuthDto";

export class AuthRepository {
  constructor(private readonly client: HttpClient) {}

  async login(email: string, password: string): Promise<SignInResponse> {
    return this.client.post("/api/v1/auth", { email, password });
  }

  async signUp(
    email: string,
    password: string,
    nickname: string,
    phoneNumber: string,
    name: string
  ): Promise<UserInfo> {
    return this.client.post<UserInfo>("/api/v1/user", {
      email,
      password,
      nickname,
      phoneNumber,
      name,
    });
  }
}

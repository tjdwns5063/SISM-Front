export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
  phoneNumber: string;
  name: string;
}

export interface UserInfo {
  id: number;
  nickname: string;
  email: string;
  phoneNumber: string;
  name: string;
  createdAt: string;
}

export interface SignInResponse {
  user: UserInfo;
  sessionKey: string;
}

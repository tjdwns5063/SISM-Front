// HTTP 메서드 타입
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// 에러 응답 객체 타입
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// API 클라이언트 인터페이스 (Repository에 주입할 규격)
export interface HttpClient {
  get<T>(url: string, options?: Omit<RequestInit, "method">): Promise<T>;
  post<T, D = unknown>(
    url: string,
    data?: D,
    options?: Omit<RequestInit, "method" | "body">
  ): Promise<T>;
  put<T, D = unknown>(
    url: string,
    data?: D,
    options?: Omit<RequestInit, "method" | "body">
  ): Promise<T>;
  delete<T>(url: string, options?: Omit<RequestInit, "method">): Promise<T>;
}

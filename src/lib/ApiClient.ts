/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HttpClient } from "./ApiClient.type";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export class FetchHttpClient implements HttpClient {
  private async fetcher<T>(url: string, options: RequestInit): Promise<T> {
    const token = localStorage.getItem("accessToken");

    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);

    const response = await fetch(`${BASE_URL}${url}`, { ...options, headers });

    if (!response.ok) {
      const error: any = await response
        .json()
        .catch(() => ({ message: "Unknown Error" }));
      throw { status: response.status, ...error };
    }

    if (response.status === 204) return {} as T;
    return response.json();
  }

  async get<T>(url: string, options?: RequestInit): Promise<T> {
    return this.fetcher<T>(url, { ...options, method: "GET" });
  }

  async post<T, D = unknown>(
    url: string,
    data?: D,
    options?: RequestInit
  ): Promise<T> {
    return this.fetcher<T>(url, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T, D = unknown>(
    url: string,
    data?: D,
    options?: RequestInit
  ): Promise<T> {
    return this.fetcher<T>(url, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(url: string, options?: RequestInit): Promise<T> {
    return this.fetcher<T>(url, { ...options, method: "DELETE" });
  }
}

export const apiClient = new FetchHttpClient();

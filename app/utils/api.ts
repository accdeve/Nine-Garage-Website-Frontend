import type { FetchError } from "ofetch";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiRequestOptions {
  method?: HttpMethod;
  params?: Record<string, unknown>;
  body?: unknown;
  headers?: Record<string, string>;
}

export class ApiError extends Error {
  statusCode: number;
  data?: unknown;

  constructor(message: string, statusCode: number, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  url: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBaseUrl as string;

  try {
    return (await $fetch<T>(url, {
      baseURL,
      method: options.method ?? "GET",
      params: options.params,
      body: options.body as any,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options.headers,
      },
    })) as T;
  } catch (error: unknown) {
    const fetchError = error as FetchError<{ message?: string }>;

    throw new ApiError(
      fetchError?.data?.message ??
        fetchError?.message ??
        "Terjadi kesalahan pada server",
      fetchError?.statusCode ?? 500,
      fetchError?.data,
    );
  }
}

export function apiGet<T>(url: string, params?: Record<string, unknown>) {
  return apiRequest<T>(url, { method: "GET", params });
}

export function apiPost<T>(url: string, body?: unknown) {
  return apiRequest<T>(url, { method: "POST", body });
}

export function apiPut<T>(url: string, body?: unknown) {
  return apiRequest<T>(url, { method: "PUT", body });
}

export function apiPatch<T>(url: string, body?: unknown) {
  return apiRequest<T>(url, { method: "PATCH", body });
}

export function apiDelete<T>(url: string) {
  return apiRequest<T>(url, { method: "DELETE" });
}

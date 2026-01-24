import type { FetchError } from 'ofetch'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface ApiRequestOptions {
  method?: HttpMethod
  params?: Record<string, unknown>
  body?: unknown
  headers?: Record<string, string>
}

interface ApiError {
  statusCode: number
  message: string
  data?: unknown
}

export async function apiRequest<T>(
  url: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const config = useRuntimeConfig()

  try {
    return await $fetch<T>(url, {
      baseURL: config.public.apiBaseUrl,
      method: options.method ?? 'GET',
      params: options.params,
      body: options.body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...options.headers
      }
    })
  } catch (error: unknown) {
    const fetchError = error as FetchError<unknown>

    const apiError: ApiError = {
      statusCode: fetchError?.statusCode ?? 500,
      message:
        fetchError?.data?.message ??
        fetchError?.message ??
        'Terjadi kesalahan pada server',
      data: fetchError?.data
    }

    throw apiError
  }
}

export function apiGet<T>(url: string, params?: Record<string, unknown>) {
  return apiRequest<T>(url, { method: 'GET', params })
}

export function apiPost<T>(url: string, body?: unknown) {
  return apiRequest<T>(url, { method: 'POST', body })
}

export function apiPut<T>(url: string, body?: unknown) {
  return apiRequest<T>(url, { method: 'PUT', body })
}

export function apiPatch<T>(url: string, body?: unknown) {
  return apiRequest<T>(url, { method: 'PATCH', body })
}

export function apiDelete<T>(url: string) {
  return apiRequest<T>(url, { method: 'DELETE' })
}

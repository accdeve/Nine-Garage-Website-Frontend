export interface ApiMeta {
  page: number;
  total_data: number;
  total_page: number;
}

export interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
  meta?: ApiMeta;
}

export interface ApiResponseMeta {
  timestamp: string;
  page?: number;
  limit?: number;
  total?: number;
}

export interface ApiResponse<T> {
  data: T;
  meta: ApiResponseMeta;
  links?: Record<string, string>;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
  };
  meta: ApiResponseMeta;
}

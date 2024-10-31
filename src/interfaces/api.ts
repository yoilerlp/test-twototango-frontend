export type ServiceResponse<T> = {
  data: T;
  statusCode?: number;
};

export type PaginatedData<T> = {
  rows: T[];
  total: number;
  page: number;
};

export type ServiceErrorResponse = {
  message: string | string[];
  error: string;
  statusCode: number;
};

export type ServiceResponsePaginated<T> = ServiceResponse<PaginatedData<T>>;


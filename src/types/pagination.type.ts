export interface IPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IPaginatedData<T> {
  data: T;
  pagination: IPagination;
}
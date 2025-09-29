export interface Pagination {
  current_page: number;
  first_page_url: string;
  prev_page_url: string;
  next_page_url: string;
  last_page_url: string;
  last_page: number;
  per_page: number;
  next_page: number;
  previous_page: number;
  total: number;
  count: number;
  path: string;
}

export interface PaginatedData {
  pagination: Pagination;
}

export type PaginatedType<T, K extends keyof any, V> = T & { [P in K]: V };

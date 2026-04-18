export interface PaginationMeta {
  currentPage: number;
  pageItems: number;
  totalPages: number;
  totalCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export const parsePagination = (headers: Record<string, unknown>): PaginationMeta => ({
  currentPage: parseInt(String(headers['current-page'] ?? '1')),
  pageItems: parseInt(String(headers['page-items'] ?? '25')),
  totalPages: parseInt(String(headers['total-pages'] ?? '1')),
  totalCount: parseInt(String(headers['total-count'] ?? '0')),
});

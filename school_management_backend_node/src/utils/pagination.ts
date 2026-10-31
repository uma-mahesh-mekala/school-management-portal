export interface PagingResult<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export function buildPagingResult<T>(
  content: T[],
  totalElements: number,
  page: number,
  size: number
): PagingResult<T> {
  const totalPages = size > 0 ? Math.ceil(totalElements / size) : 0;
  return {
    content,
    page,
    size,
    totalElements,
    totalPages,
    first: page === 0,
    last: page >= totalPages - 1 || totalPages === 0,
    empty: content.length === 0
  };
}

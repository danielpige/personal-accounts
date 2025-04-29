export interface GenericPaginationData<T = any> {
  page: number;
  currentElements: number;
  total: number;
  results: T[];
}

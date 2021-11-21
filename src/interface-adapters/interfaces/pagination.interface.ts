export interface Pagination<T> {
  data: T[];
  total: number;
  size: number;
}

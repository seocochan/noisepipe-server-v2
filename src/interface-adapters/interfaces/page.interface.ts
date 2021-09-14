export interface Page<T> {
  page: number;
  size: number;
  total: number;
  data: T[];
}

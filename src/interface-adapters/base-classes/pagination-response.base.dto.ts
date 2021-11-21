import { Pagination } from '../interfaces/pagination.interface';

export class PaginationResponseBase<T> implements Pagination<T> {
  constructor(options: PaginationResponseBase<T>) {
    Object.assign(this, options);
  }

  data!: T[];
  total!: number;
  size!: number;
}

import { PaginationResponseBase } from '../base-classes/pagination-response.base.dto';

// TODO: extend할 베이스와 별도로 PageResponse에 대한 interface port 정의하여
// implement 하기 (e.g. UserResponse)
export class PageResponse<T> extends PaginationResponseBase<T> {
  constructor(options: PageResponse<T>) {
    const { page, ...commonProps } = options;
    super(commonProps);
    this.page = page;
  }

  data!: T[];
  total!: number;
  size!: number;
  page!: number;
}

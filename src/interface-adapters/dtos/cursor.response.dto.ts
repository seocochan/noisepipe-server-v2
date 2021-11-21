import { PaginationResponseBase } from '../base-classes/pagination-response.base.dto';

// TODO: extend할 베이스와 별도로 PageResponse에 대한 interface port 정의하여
// implement 하기 (e.g. UserResponse)
export class CursorResponse<T> extends PaginationResponseBase<T> {
  constructor(options: CursorResponse<T>) {
    const { cursor, nextCursor, ...commonProps } = options;
    super(commonProps);
    this.cursor = cursor;
    this.nextCursor = nextCursor;
  }

  data!: T[];
  total!: number;
  size!: number;
  cursor!: string | null;
  nextCursor!: string | null;
}

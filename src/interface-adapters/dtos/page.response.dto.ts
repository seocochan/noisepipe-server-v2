import { DataWithPaginationMeta } from '@core/ports/repository.ports';
import { Page } from '../interfaces/page.interface';

export class PageResponse<T> implements Page<T> {
  static of<TSource, TData>(
    meta: DataWithPaginationMeta<TSource>,
    dataMapper: (source: TSource) => TData,
  ): PageResponse<TData> {
    return new PageResponse<TData>({
      data: meta.data.map(dataMapper),
      page: Math.ceil(meta.offset / meta.limit) + 1,
      size: meta.limit,
      total: meta.count,
    });
  }

  constructor(options: PageResponse<T>) {
    Object.assign(this, options);
  }

  data!: T[];
  page!: number;
  size!: number;
  total!: number;
}

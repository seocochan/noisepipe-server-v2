import { ID } from '../value-objects/id.value-object';

/*  Most of repositories will probably need generic 
    save/find/delete operations, so it's easier
    to have some shared interfaces.
    More specific interfaces should be defined
    in a respective module/use case.
*/

export interface Save<TEntity> {
  save(entity: TEntity): Promise<TEntity>;
}

export interface SaveMultiple<TEntity> {
  saveMultiple(entities: TEntity[]): Promise<TEntity[]>;
}

export interface FindOne<TEntity, TQueryParams> {
  findOneOrThrow(params: TQueryParams): Promise<TEntity>;
}

export interface FindOneById<TEntity> {
  findOneByIdOrThrow(id: ID | string): Promise<TEntity>;
}

export interface FindMany<TEntity, TQueryParams> {
  findMany(params: TQueryParams): Promise<TEntity[]>;
}

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface OrderBy {
  [key: string]: OrderDirection;
}

export interface PaginationMeta {
  offset?: number;
  limit?: number;
}

export interface FindManyPaginatedParams<TQueryParams> {
  params: TQueryParams;
  pagination?: PaginationMeta;
  orderBy?: OrderBy;
}

export interface DataWithPaginationMeta<T> {
  data: T[];
  count: number;
  limit: number;
  offset: number;
}

export interface FindManyPaginated<TEntity, TEntityProps> {
  findManyPaginated(
    options: FindManyPaginatedParams<TEntityProps>,
  ): Promise<DataWithPaginationMeta<TEntity>>;
}

export interface DeleteOne<TEntity> {
  delete(entity: TEntity): Promise<TEntity>;
}

export abstract class RepositoryPort<TEntity, TQueryParams>
  implements
    Save<TEntity>,
    SaveMultiple<TEntity>,
    FindOne<TEntity, TQueryParams>,
    FindOneById<TEntity>,
    FindMany<TEntity, TQueryParams>,
    FindManyPaginated<TEntity, TQueryParams>,
    DeleteOne<TEntity>
{
  abstract save(entity: TEntity): Promise<TEntity>;

  abstract saveMultiple(entities: TEntity[]): Promise<TEntity[]>;

  abstract findOneOrThrow(params: TQueryParams): Promise<TEntity>;

  abstract findOneByIdOrThrow(id: ID | string): Promise<TEntity>;

  abstract findMany(params: TQueryParams): Promise<TEntity[]>;

  abstract findManyPaginated(
    options: FindManyPaginatedParams<TQueryParams>,
  ): Promise<DataWithPaginationMeta<TEntity>>;

  abstract delete(entity: TEntity): Promise<TEntity>;
}

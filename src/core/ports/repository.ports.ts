import { BaseEntityProps } from '../base-classes/entity.base';
import { DeepPartial } from '../types';
import { ID } from '../value-objects/id.value-object';

/*  Most of repositories will probably need generic 
    save/find/delete operations, so it's easier
    to have some shared interfaces.
    More specific interfaces should be defined
    in a respective module/use case.
*/

export type QueryParams<TEntityProps> = DeepPartial<
  BaseEntityProps & TEntityProps
>;

export interface Save<TEntity> {
  save(entity: TEntity): Promise<TEntity>;
}

export interface SaveMultiple<TEntity> {
  saveMultiple(entities: TEntity[]): Promise<TEntity[]>;
}

export interface FindOne<TEntity, TEntityProps> {
  findOneOrThrow(params: QueryParams<TEntityProps>): Promise<TEntity>;
}

export interface FindOneById<TEntity> {
  findOneByIdOrThrow(id: ID | string): Promise<TEntity>;
}

export interface FindMany<TEntity, TEntityProps> {
  findMany(params: QueryParams<TEntityProps>): Promise<TEntity[]>;
}

export interface OrderBy {
  [key: number]: -1 | 1;
}

export interface PaginationMeta {
  skip?: number;
  limit?: number;
  page?: number;
}

export interface FindManyPaginatedParams<TEntityProps> {
  params?: QueryParams<TEntityProps>;
  pagination?: PaginationMeta;
  orderBy?: OrderBy;
}

export interface DataWithPaginationMeta<T> {
  data: T;
  count: number;
  limit?: number;
  page?: number;
}

export interface FindManyPaginated<TEntity, TEntityProps> {
  findManyPaginated(
    options: FindManyPaginatedParams<TEntityProps>,
  ): Promise<DataWithPaginationMeta<TEntity[]>>;
}

export interface DeleteOne<TEntity> {
  delete(entity: TEntity): Promise<TEntity>;
}

export abstract class RepositoryPort<TEntity, TEntityProps>
  implements
    Save<TEntity>,
    SaveMultiple<TEntity>,
    FindOne<TEntity, TEntityProps>,
    FindOneById<TEntity>,
    FindMany<TEntity, TEntityProps>,
    FindManyPaginated<TEntity, TEntityProps>,
    DeleteOne<TEntity>
{
  abstract save(entity: TEntity): Promise<TEntity>;

  abstract saveMultiple(entities: TEntity[]): Promise<TEntity[]>;

  abstract findOneOrThrow(params: QueryParams<TEntityProps>): Promise<TEntity>;

  abstract findOneByIdOrThrow(id: ID | string): Promise<TEntity>;

  abstract findMany(params: QueryParams<TEntityProps>): Promise<TEntity[]>;

  abstract findManyPaginated(
    options: FindManyPaginatedParams<TEntityProps>,
  ): Promise<DataWithPaginationMeta<TEntity[]>>;

  abstract delete(entity: TEntity): Promise<TEntity>;
}

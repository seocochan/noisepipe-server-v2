import { NotFoundException } from '@exceptions';
import {
  EntityRepository,
  FilterQuery,
  FindOptions,
  Primary,
} from '@mikro-orm/core';
import { DomainEvents } from 'src/core/domain-events';
import { Logger } from 'src/core/ports/logger.port';
import { ID } from 'src/core/value-objects/id.value-object';
import { BaseEntityProps } from '../../../core/base-classes/entity.base';
import {
  DataWithPaginationMeta,
  FindManyPaginatedParams,
  QueryParams,
  RepositoryPort,
} from '../../../core/ports/repository.ports';
import { OrmMapper } from './orm-mapper.base';

export type WhereCondition<TOrmEntity> =
  | FilterQuery<TOrmEntity>[]
  | FilterQuery<TOrmEntity>
  | Record<string, unknown>
  | string;

export abstract class OrmRepositoryBase<
  TEntity extends BaseEntityProps,
  TEntityProps,
  TOrmEntity,
> implements RepositoryPort<TEntity, TEntityProps>
{
  protected constructor(
    protected readonly repository: EntityRepository<TOrmEntity>,
    protected readonly mapper: OrmMapper<TEntity, TOrmEntity>,
    protected readonly logger: Logger,
  ) {}

  protected abstract relations: string[] = [];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  protected entityName = this.repository.entityName.toString();

  protected abstract prepareQuery(
    params: QueryParams<TEntityProps>,
  ): WhereCondition<TOrmEntity>;

  async save(entity: TEntity): Promise<TEntity> {
    const ormEntity = this.mapper.toOrmEntity(entity);
    await this.repository.persistAndFlush(ormEntity);
    this.logger.debug(
      `[Entity persisted]: ${this.entityName} ${entity.id.value}`,
    );
    await DomainEvents.publishEvents(entity.id, this.logger);
    return this.mapper.toDomainEntity(ormEntity);
  }

  async saveMultiple(entities: TEntity[]): Promise<TEntity[]> {
    const ormEntities = entities.map((entity) =>
      this.mapper.toOrmEntity(entity),
    );
    await this.repository.persistAndFlush(ormEntities);
    this.logger.debug(
      `[Multiple entities persisted]: ${entities.length} ${this.entityName}`,
    );
    await Promise.all(
      entities.map((entity) =>
        DomainEvents.publishEvents(entity.id, this.logger),
      ),
    );
    return ormEntities.map((entity) => this.mapper.toDomainEntity(entity));
  }

  async findOne(
    params: QueryParams<TEntityProps> = {},
  ): Promise<TEntity | undefined> {
    const found = await this.repository.findOne(
      this.prepareQuery(params) as FilterQuery<TOrmEntity>,
      { populate: this.relations },
    );
    return found ? this.mapper.toDomainEntity(found) : undefined;
  }

  async findOneOrThrow(
    params: QueryParams<TEntityProps> = {},
  ): Promise<TEntity> {
    const found = await this.findOne(params);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async findOneByIdOrThrow(id: ID | string): Promise<TEntity> {
    const found = await this.repository.findOne({
      id: id instanceof ID ? id.value : id,
    } as Primary<string>);
    if (!found) {
      throw new NotFoundException();
    }
    return this.mapper.toDomainEntity(found);
  }

  async findMany(params: QueryParams<TEntityProps> = {}): Promise<TEntity[]> {
    const result = await this.repository.find(
      this.prepareQuery(params) as FilterQuery<TOrmEntity>,
      { populate: this.relations },
    );

    return result.map((item) => this.mapper.toDomainEntity(item));
  }

  async findManyPaginated({
    params = {},
    pagination,
    orderBy,
  }: FindManyPaginatedParams<TEntityProps>): Promise<
    DataWithPaginationMeta<TEntity[]>
  > {
    const [data, count] = await this.repository.findAndCount(
      this.prepareQuery(params) as FilterQuery<TOrmEntity>,
      {
        populate: this.relations,
        orderBy: orderBy,
        limit: pagination?.limit,
        offset: pagination?.skip,
      } as FindOptions<TOrmEntity>,
    );

    const result: DataWithPaginationMeta<TEntity[]> = {
      data: data.map((item) => this.mapper.toDomainEntity(item)),
      count,
      limit: pagination?.limit,
      page: pagination?.page,
    };

    return result;
  }

  async delete(entity: TEntity): Promise<TEntity> {
    await this.repository.removeAndFlush(this.mapper.toOrmEntity(entity));
    this.logger.debug(
      `[Entity deleted]: ${this.entityName} ${entity.id.value}`,
    );
    await DomainEvents.publishEvents(entity.id, this.logger);
    return entity;
  }
}

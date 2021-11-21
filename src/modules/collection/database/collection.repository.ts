import { DateVO } from '@core/value-objects/date.value-object';
import { ID } from '@core/value-objects/id.value-object';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CollectionOrmMapper } from '@modules/collection/database/collection-orm-mapper';
import { CollectionTagOrmEntity } from '@modules/collection/database/collection-tag.orm-entity';
import { CollectionOrmEntity } from '@modules/collection/database/collection.orm-entity';
import { CollectionRepositoryPort } from '@modules/collection/database/collection.repository.interface';
import { CollectionEntity } from '@modules/collection/domain/entities/collection.entity';
import { CollectionTagName } from '@modules/collection/domain/value-objects/collection-tag-name.value-object';
import { CollectionTitle } from '@modules/collection/domain/value-objects/collection-title.value-object';
import { Injectable, Logger } from '@nestjs/common';
import {
  OrmRepositoryBase,
  WhereCondition,
} from '../../../infrastructure/database/base-classes/orm.repository.base';

export interface CollectionQueryParams {
  id?: ID;
  titleOrTagNameLike?: { title: CollectionTitle; tagName: CollectionTagName };
  cursorNext?: { createdAt: DateVO; id: ID };
}

@Injectable()
export class CollectionRepository
  extends OrmRepositoryBase<
    CollectionEntity,
    CollectionQueryParams,
    CollectionOrmEntity
  >
  implements CollectionRepositoryPort
{
  protected relations = ['tags', 'author'];

  constructor(
    @InjectRepository(CollectionOrmEntity)
    private readonly collectionRepository: EntityRepository<CollectionOrmEntity>,
    @InjectRepository(CollectionTagOrmEntity)
    private readonly collectionTagRepository: EntityRepository<CollectionTagOrmEntity>,
    private readonly em: EntityManager,
  ) {
    super(
      collectionRepository,
      new CollectionOrmMapper(em),
      new Logger('collection-repository'),
    );
  }

  protected prepareQuery(
    params: CollectionQueryParams,
  ): WhereCondition<CollectionOrmEntity> {
    const conditions: WhereCondition<CollectionOrmEntity>[] = [];
    if (params.id) {
      conditions.push({ id: params.id.value });
    }
    if (params.titleOrTagNameLike) {
      conditions.push({
        $or: [
          { title: { $ilike: `%${params.titleOrTagNameLike.title.value}%` } },
          {
            tags: {
              name: { $ilike: `%${params.titleOrTagNameLike.tagName.value}%` },
            },
          },
        ],
      });
    }
    if (params.cursorNext) {
      conditions.push({
        $and: [
          { createdAt: { $lte: params.cursorNext.createdAt.value } },
          {
            $or: [
              { createdAt: { $lt: params.cursorNext.createdAt.value } },
              { id: { $gte: params.cursorNext.id.value } },
            ],
          },
        ],
      });
    }
    return { $and: conditions };
  }
}

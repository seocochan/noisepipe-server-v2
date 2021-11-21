import { ObjectLiteral } from '@core/types';
import { ID } from '@core/value-objects/id.value-object';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CollectionTagOrmEntity } from '@modules/collection/database/collection-tag.orm-entity';
import { CollectionTagOrmMapper } from '@modules/collection/database/collection-tag.orm-mapper';
import { CollectionTagRepositoryPort } from '@modules/collection/database/collection-tag.repository.interface';
import { CollectionTagEntity } from '@modules/collection/domain/entities/collection-tag.entity';
import { CollectionTagName } from '@modules/collection/domain/value-objects/collection-tag-name.value-object';
import { Injectable, Logger } from '@nestjs/common';
import {
  OrmRepositoryBase,
  WhereCondition,
} from '../../../infrastructure/database/base-classes/orm.repository.base';

export interface CollectionTagQueryParams {
  id?: ID;
  name?: CollectionTagName;
}

@Injectable()
export class CollectionTagRepository
  extends OrmRepositoryBase<
    CollectionTagEntity,
    CollectionTagQueryParams,
    CollectionTagOrmEntity
  >
  implements CollectionTagRepositoryPort
{
  protected relations = [];

  constructor(
    @InjectRepository(CollectionTagOrmEntity)
    private readonly collectionTagRepository: EntityRepository<CollectionTagOrmEntity>,
    private readonly em: EntityManager,
  ) {
    super(
      collectionTagRepository,
      new CollectionTagOrmMapper(em),
      new Logger('collection-tag-repository'),
    );
  }

  protected prepareQuery(
    params: CollectionTagQueryParams,
  ): WhereCondition<CollectionTagOrmEntity> {
    const where: ObjectLiteral = {};
    if (params.id) {
      where.id = params.id.value;
    }
    if (params.name) {
      where.name = params.name.value;
    }
    return where as WhereCondition<CollectionTagOrmEntity>;
  }
}

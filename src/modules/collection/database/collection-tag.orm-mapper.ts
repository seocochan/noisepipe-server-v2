import { EntityManager } from '@mikro-orm/core';
import { CollectionTagOrmEntity } from '@modules/collection/database/collection-tag.orm-entity';
import {
  CollectionTagEntity,
  CollectionTagProps,
} from '@modules/collection/domain/entities/collection-tag.entity';
import { CollectionTagName } from '@modules/collection/domain/value-objects/collection-tag-name.value-object';
import { OrmMapper } from '../../../infrastructure/database/base-classes/orm-mapper.base';

export class CollectionTagOrmMapper extends OrmMapper<
  CollectionTagEntity,
  CollectionTagOrmEntity
> {
  constructor(private readonly em: EntityManager) {
    super();
  }

  toDomainEntity(ormEntity: CollectionTagOrmEntity): CollectionTagEntity {
    const entity = this.assignPropsToDomainEntity<CollectionTagProps>(
      CollectionTagEntity,
      { name: new CollectionTagName(ormEntity.name) },
      ormEntity,
    );
    return entity;
  }

  toOrmEntity(entity: CollectionTagEntity): CollectionTagOrmEntity {
    const props = entity.getPropsCopy();
    const ormProps = {
      id: props.id.value,
      createdAt: props.createdAt.value,
      updatedAt: props.updatedAt.value,
      name: props.name.value,
    };
    const persistent = this.em
      .getUnitOfWork()
      .getById<CollectionTagOrmEntity>(
        'CollectionTagOrmEntity',
        props.id.value,
      );
    const ormEntity = persistent
      ? this.em.assign(persistent, ormProps)
      : new CollectionTagOrmEntity(ormProps);
    return ormEntity;
  }
}

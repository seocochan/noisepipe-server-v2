import { ID } from '@core/value-objects/id.value-object';
import { EntityManager } from '@mikro-orm/core';
import { CollectionTagOrmMapper } from '@modules/collection/database/collection-tag.orm-mapper';
import { CollectionOrmEntity } from '@modules/collection/database/collection.orm-entity';
import {
  CollectionEntity,
  CollectionProps,
} from '@modules/collection/domain/entities/collection.entity';
import { CollectionDescription } from '@modules/collection/domain/value-objects/collection-description.value-object';
import { CollectionTitle } from '@modules/collection/domain/value-objects/collection-title.value-object';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { OrmMapper } from '../../../infrastructure/database/base-classes/orm-mapper.base';

export class CollectionOrmMapper extends OrmMapper<
  CollectionEntity,
  CollectionOrmEntity
> {
  private collectionTagOrmMapper: CollectionTagOrmMapper;

  constructor(private readonly em: EntityManager) {
    super();
    this.collectionTagOrmMapper = new CollectionTagOrmMapper(em);
  }

  toDomainEntity(ormEntity: CollectionOrmEntity): CollectionEntity {
    const entity = this.assignPropsToDomainEntity<CollectionProps>(
      CollectionEntity,
      {
        title: new CollectionTitle(ormEntity.title),
        description: ormEntity.description
          ? new CollectionDescription(ormEntity.description)
          : null,
        tags: ormEntity.tags
          .getItems()
          .map((it) => this.collectionTagOrmMapper.toDomainEntity(it)),
        authorId: new ID(ormEntity.author.id),
      },
      ormEntity,
    );
    return entity;
  }

  toOrmEntity(entity: CollectionEntity): CollectionOrmEntity {
    const props = entity.getPropsCopy();
    const ormProps = {
      id: props.id.value,
      createdAt: props.createdAt.value,
      updatedAt: props.updatedAt.value,
      title: props.title.value,
      description: props.description?.value,
      author: this.em.getReference(UserOrmEntity, props.authorId.value, true),
    };

    const persistent = this.em
      .getUnitOfWork()
      .getById<CollectionOrmEntity>('CollectionOrmEntity', props.id.value);
    const ormEntity = persistent
      ? this.em.assign(persistent, ormProps)
      : new CollectionOrmEntity(ormProps);
    ormEntity.tags.set(
      props.tags.map((it) => this.collectionTagOrmMapper.toOrmEntity(it)),
    );
    return ormEntity;
  }
}

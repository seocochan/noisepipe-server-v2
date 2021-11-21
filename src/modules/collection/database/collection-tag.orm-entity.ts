import {
  Collection,
  Entity,
  ManyToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { CollectionOrmEntity } from '@modules/collection/database/collection.orm-entity';
import { OrmDateAuditEntityBase } from '../../../infrastructure/database/base-classes/orm-date-audit.entity.base';

export type CollectionTagOrmProps = Omit<CollectionTagOrmEntity, 'collections'>;

@Entity({ tableName: 'collection_tags' })
export class CollectionTagOrmEntity extends OrmDateAuditEntityBase {
  constructor(props?: CollectionTagOrmProps) {
    super(props);
  }

  @Property()
  @Unique()
  name!: string;

  @ManyToMany(() => CollectionOrmEntity, (collection) => collection.tags)
  collections = new Collection<CollectionOrmEntity>(this);
}

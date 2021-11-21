import {
  Collection,
  Entity,
  IdentifiedReference,
  ManyToMany,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { CollectionTagOrmEntity } from '@modules/collection/database/collection-tag.orm-entity';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { OrmDateAuditEntityBase } from '../../../infrastructure/database/base-classes/orm-date-audit.entity.base';

export type CollectionOrmProps = Omit<
  CollectionOrmEntity,
  'author' | 'tags' | 'bookmarks'
>;

@Entity({ tableName: 'collections' })
export class CollectionOrmEntity extends OrmDateAuditEntityBase {
  constructor(props?: CollectionOrmProps) {
    super(props);
  }

  @Property()
  title!: string;

  @Property({ nullable: true })
  description?: string;

  @ManyToOne(() => UserOrmEntity, { wrappedReference: true })
  author!: IdentifiedReference<UserOrmEntity>;

  // TODO: unique(colllection_id, tag_id)
  // api를 찾아보고 있으면 사용하고,
  // 없으면 테이블을 쪼개거나,
  // 유니크 제약 없이 엔티티에서만 검증하거나
  @ManyToMany({
    entity: () => CollectionTagOrmEntity,
    mappedBy: 'collections',
    owner: true,
    pivotTable: 'collections_tags',
  })
  tags = new Collection<CollectionTagOrmEntity>(this);
}

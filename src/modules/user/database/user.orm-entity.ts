import {
  Collection,
  Entity,
  ManyToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { UserRoleOrmEntity } from '@modules/user/database/user-role.orm-entity';
import { OrmDateAuditEntityBase } from '../../../infrastructure/database/base-classes/orm-date-audit.entity.base';

/**
 * Skipping some properties those are not proper to initialize in ctor
 */
export type UserOrmProps = Omit<UserOrmEntity, 'roles'>;

@Entity({ tableName: 'users' })
export class UserOrmEntity extends OrmDateAuditEntityBase {
  constructor(props?: UserOrmProps) {
    super(props);
  }

  @Property()
  @Unique()
  username!: string;

  @Property()
  password!: string;

  @ManyToMany({
    entity: () => UserRoleOrmEntity,
    mappedBy: 'users',
    owner: true,
    pivotTable: 'users_roles',
  })
  roles = new Collection<UserRoleOrmEntity>(this);
}

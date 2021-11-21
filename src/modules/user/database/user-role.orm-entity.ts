import { Collection, Entity, Enum, ManyToMany, Unique } from '@mikro-orm/core';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { UserRoleName } from '@modules/user/domain/enums/user-role-name.enum';
import { OrmEntityBase } from '../../../infrastructure/database/base-classes/orm.entity.base';

export type UserOrmProps = Omit<UserRoleOrmEntity, 'users'>;

@Entity({ tableName: 'user_roles' })
export class UserRoleOrmEntity extends OrmEntityBase {
  constructor(props?: UserOrmProps) {
    super(props);
  }

  @Enum(() => UserRoleName)
  @Unique()
  name!: UserRoleName;

  @ManyToMany(() => UserOrmEntity, (user) => user.roles)
  users = new Collection<UserOrmEntity>(this);
}

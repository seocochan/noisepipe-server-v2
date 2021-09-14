import { EntityManager } from '@mikro-orm/core';
import { UserRoleOrmEntity } from '@modules/user/database/user-role.orm-entity';
import {
  UserRoleEntity,
  UserRoleProps,
} from '@modules/user/domain/entities/user-role.entity';
import { OrmMapper } from '../../../infrastructure/database/base-classes/orm-mapper.base';

export type UserRoleOrmProps = UserRoleOrmEntity;

export class UserRoleOrmMapper extends OrmMapper<
  UserRoleEntity,
  UserRoleOrmEntity
> {
  constructor(private readonly em: EntityManager) {
    super();
  }

  toDomainEntity(ormEntity: UserRoleOrmProps): UserRoleEntity {
    const entity = this.assignPropsToDomainEntity<UserRoleProps>(
      UserRoleEntity,
      {
        name: ormEntity.name,
      },
      ormEntity,
    );
    return entity;
  }

  toOrmEntity(entity: UserRoleEntity): UserRoleOrmEntity {
    const props = entity.getPropsCopy();
    const ormProps = {
      id: props.id.value,
      name: props.name,
    };

    const persistent = this.em
      .getUnitOfWork()
      .getById<UserRoleOrmEntity>('UserRoleOrmEntity', props.id.value);
    const ormEntity = persistent
      ? this.em.assign(persistent, ormProps)
      : new UserRoleOrmEntity(ormProps);
    return ormEntity;
  }
}

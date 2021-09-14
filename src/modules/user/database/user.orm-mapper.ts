import { EntityManager } from '@mikro-orm/core';
import { UserRoleOrmMapper } from '@modules/user/database/user-role.orm-mapper';
import { Password } from '@modules/user/domain/value-objects/password.value-object';
import { Username } from '@modules/user/domain/value-objects/username.value-object';
import { OrmMapper } from 'src/infrastructure/database/base-classes/orm-mapper.base';
import { UserEntity, UserProps } from '../domain/entities/user.entity';
import { UserOrmEntity } from './user.orm-entity';

export class UserOrmMapper extends OrmMapper<UserEntity, UserOrmEntity> {
  private userRoleOrmMapper: UserRoleOrmMapper;

  constructor(private readonly em: EntityManager) {
    super();
    this.userRoleOrmMapper = new UserRoleOrmMapper(em);
  }

  toDomainEntity(ormEntity: UserOrmEntity): UserEntity {
    const entity = this.assignPropsToDomainEntity<UserProps>(
      UserEntity,
      {
        username: new Username(ormEntity.username),
        password: new Password(ormEntity.password),
        roles: ormEntity.roles
          .getItems()
          .map((it) => this.userRoleOrmMapper.toDomainEntity(it)),
      },
      ormEntity,
    );
    return entity;
  }

  toOrmEntity(entity: UserEntity): UserOrmEntity {
    const props = entity.getPropsCopy();
    const ormProps = {
      id: props.id.value,
      createdAt: props.createdAt.value,
      updatedAt: props.updatedAt.value,
      username: props.username.value,
      password: props.password.value,
    };

    const persistent = this.em
      .getUnitOfWork()
      .getById<UserOrmEntity>('UserOrmEntity', props.id.value);
    const ormEntity = persistent
      ? this.em.assign(persistent, ormProps)
      : new UserOrmEntity(ormProps);
    ormEntity.roles.set(
      props.roles.map((it) => this.userRoleOrmMapper.toOrmEntity(it)),
    );
    return ormEntity;
  }
}

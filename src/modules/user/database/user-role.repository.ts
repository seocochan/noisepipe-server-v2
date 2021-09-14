import { ObjectLiteral } from '@core/types';
import { ID } from '@core/value-objects/id.value-object';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserRoleOrmEntity } from '@modules/user/database/user-role.orm-entity';
import { UserRoleOrmMapper } from '@modules/user/database/user-role.orm-mapper';
import { UserRoleRepositoryPort } from '@modules/user/database/user-role.repository.interface';
import { UserRoleEntity } from '@modules/user/domain/entities/user-role.entity';
import { UserRoleName } from '@modules/user/domain/enums/user-role-name.enum';
import { Injectable, Logger } from '@nestjs/common';
import {
  OrmRepositoryBase,
  WhereCondition,
} from '../../../infrastructure/database/base-classes/orm.repository.base';

export interface UserRoleQueryParams {
  id: ID;
}

// TODO: extend ReadonlyOrmRepositoryBase
@Injectable()
export class UserRoleRepository
  extends OrmRepositoryBase<
    UserRoleEntity,
    UserRoleQueryParams,
    UserRoleOrmEntity
  >
  implements UserRoleRepositoryPort
{
  protected relations: string[] = [];

  constructor(
    @InjectRepository(UserRoleOrmEntity)
    private readonly userRoleRepository: EntityRepository<UserRoleOrmEntity>,
    private readonly em: EntityManager,
  ) {
    super(
      userRoleRepository,
      new UserRoleOrmMapper(em),
      new Logger('user-role-repository'),
    );
  }

  async findOneByName(name: UserRoleName): Promise<UserRoleEntity | null> {
    const userRole = await this.userRoleRepository.findOne({ name });
    if (!userRole) {
      return null;
    }
    return this.mapper.toDomainEntity(userRole);
  }

  // Used to construct a query
  protected prepareQuery(
    params: UserRoleQueryParams,
  ): WhereCondition<UserRoleOrmEntity> {
    const where: ObjectLiteral = {};
    if (params.id) {
      where.id = params.id.value;
    }
    return where as WhereCondition<UserRoleOrmEntity>;
  }
}

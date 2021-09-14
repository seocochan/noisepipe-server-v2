import { ObjectLiteral } from '@core/types';
import { ID } from '@core/value-objects/id.value-object';
import { NotFoundException } from '@exceptions';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserRoleOrmEntity } from '@modules/user/database/user-role.orm-entity';
import { UserRoleRepository } from '@modules/user/database/user-role.repository';
import { Username } from '@modules/user/domain/value-objects/username.value-object';
import { Injectable, Logger } from '@nestjs/common';
import {
  OrmRepositoryBase,
  WhereCondition,
} from 'src/infrastructure/database/base-classes/orm.repository.base';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { UserOrmEntity } from './user.orm-entity';
import { UserOrmMapper } from './user.orm-mapper';
import { UserRepositoryPort } from './user.repository.interface';

export interface UserQueryParams {
  id?: ID;
  usernameLike?: Username;
}

@Injectable()
export class UserRepository
  extends OrmRepositoryBase<UserEntity, UserQueryParams, UserOrmEntity>
  implements UserRepositoryPort
{
  protected relations: string[] = ['roles'];

  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: EntityRepository<UserOrmEntity>,
    @InjectRepository(UserRoleOrmEntity)
    private readonly userRoleRepository: EntityRepository<UserRoleRepository>,
    private readonly em: EntityManager,
  ) {
    super(userRepository, new UserOrmMapper(em), new Logger('user-repository'));
  }

  async findOneByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne(
      { username },
      { populate: this.relations },
    );
    if (!user) {
      return null;
    }
    return this.mapper.toDomainEntity(user);
  }

  async findOneByUsernameOrThrow(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      { username },
      { populate: this.relations },
    );
    if (!user) {
      throw new NotFoundException();
    }
    return this.mapper.toDomainEntity(user);
  }

  async exists(username: string): Promise<boolean> {
    const found = await this.findOneByUsername(username);
    return !!found;
  }

  protected prepareQuery(
    params: UserQueryParams,
  ): WhereCondition<UserOrmEntity> {
    const where: ObjectLiteral = {};
    if (params.id) {
      where.id = params.id.value;
    }
    if (params.usernameLike) {
      where.username = { $ilike: `%${params.usernameLike.value}%` };
    }
    return where as WhereCondition<UserOrmEntity>;
  }
}

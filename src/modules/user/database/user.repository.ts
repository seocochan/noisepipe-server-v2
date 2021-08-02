import { NotFoundException } from '@exceptions';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { QueryParams } from 'src/core/ports/repository.ports';
import {
  OrmRepositoryBase,
  WhereCondition,
} from 'src/infrastructure/database/base-classes/orm.repository.base';
import {
  UserEntity,
  UserProps,
} from 'src/modules/user/domain/entities/user.entity';
import { UserOrmEntity } from './user.orm-entity';
import { UserOrmMapper } from './user.orm-mapper';
import { UserRepositoryPort } from './user.repository.interface';

@Injectable()
export class UserRepository
  extends OrmRepositoryBase<UserEntity, UserProps, UserOrmEntity>
  implements UserRepositoryPort
{
  protected relations: string[] = [];

  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: EntityRepository<UserOrmEntity>,
  ) {
    super(
      userRepository,
      new UserOrmMapper(UserEntity, UserOrmEntity),
      new Logger('user-repository'),
    );
  }

  private async findOneByEmail(email: string): Promise<UserOrmEntity | null> {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  async findOneByEmailOrThrow(email: string): Promise<UserEntity> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }
    return this.mapper.toDomainEntity(user);
  }

  async exists(email: string): Promise<boolean> {
    const found = await this.findOneByEmail(email);
    if (found) {
      return true;
    }
    return false;
  }

  // Used to construct a query
  protected prepareQuery(
    params: QueryParams<UserProps>,
  ): WhereCondition<UserOrmEntity> {
    const where: QueryParams<UserOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    return where;
  }
}

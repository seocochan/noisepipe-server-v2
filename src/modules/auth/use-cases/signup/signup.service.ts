import { Transactional } from '@core/decorators/transactional.decorator';
import { ConflictException } from '@exceptions';
import { SignupCommand } from '@modules/auth/use-cases/signup/signup.command';
import { UserRoleRepositoryPort } from '@modules/user/database/user-role.repository.interface';
import { UserRepositoryPort } from '@modules/user/database/user.repository.interface';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserRoleName } from '@modules/user/domain/enums/user-role-name.enum';
import { Password } from '@modules/user/domain/value-objects/password.value-object';
import { Username } from '@modules/user/domain/value-objects/username.value-object';
import { Injectable } from '@nestjs/common';
import { IdResponse } from '../../../../interface-adapters/dtos/id.response.dto';

@Injectable()
export class SignupService {
  constructor(
    private readonly userRepo: UserRepositoryPort,
    private readonly userRoleRepo: UserRoleRepositoryPort,
  ) {}

  @Transactional()
  async signup(command: SignupCommand): Promise<IdResponse> {
    if (await this.userRepo.exists(command.username)) {
      throw new ConflictException('User already exists');
    }

    const userRole = await this.userRoleRepo.findOneByName(UserRoleName.USER);
    if (!userRole) {
      throw new Error('User role not found');
    }

    const user = new UserEntity({
      username: new Username(command.username),
      password: Password.encode(command.password),
      roles: [userRole],
    });
    const created = await this.userRepo.save(user);
    return new IdResponse(created.id.value);
  }
}

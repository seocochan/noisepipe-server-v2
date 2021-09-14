import { Transactional } from '@core/decorators/transactional.decorator';
import { ID } from '@core/value-objects/id.value-object';
import { UnauthorizedException } from '@exceptions';
import { UserRepositoryPort } from '@modules/user/database/user.repository.interface';
import { DeleteUserCommand } from '@modules/user/use-cases/remove-user/delete-user.command';
import { Injectable } from '@nestjs/common';
import { UserPrincipal } from '../../../../interface-adapters/interfaces/auth/user-principal.interface';

@Injectable()
export class DeleteUserService {
  constructor(private readonly userRepo: UserRepositoryPort) {}

  @Transactional()
  async delete(
    command: DeleteUserCommand,
    currentUser: UserPrincipal,
  ): Promise<void> {
    const user = await this.userRepo.findOneByIdOrThrow(command.userId);
    if (!user.id.equals(new ID(currentUser.id))) {
      throw new UnauthorizedException('Invalid ownership');
    }
    await this.userRepo.delete(user);
  }
}

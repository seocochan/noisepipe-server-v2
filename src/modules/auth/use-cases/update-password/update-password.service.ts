import { Transactional } from '@core/decorators/transactional.decorator';
import { UpdatePasswordCommand } from '@modules/auth/use-cases/update-password/update-password.command';
import { UserRepositoryPort } from '@modules/user/database/user.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdatePasswordService {
  constructor(private readonly userRepo: UserRepositoryPort) {}

  @Transactional()
  async updatePassword(command: UpdatePasswordCommand): Promise<void> {
    const user = await this.userRepo.findOneByIdOrThrow(command.id);
    user.updatePassword(command.password);
    await this.userRepo.save(user);
  }
}

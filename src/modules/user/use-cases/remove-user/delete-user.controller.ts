import { routes } from '@config/app.routes';
import { Authorized } from '@core/decorators/authorized.decorator';
import { User } from '@core/decorators/user.decorator';
import { DeleteUserCommand } from '@modules/user/use-cases/remove-user/delete-user.command';
import { Controller, Delete, Param } from '@nestjs/common';
import { UserPrincipal } from '../../../../interface-adapters/interfaces/auth/user-principal.interface';
import { DeleteUserService } from './delete-user.service';

@Controller()
export class DeleteUserHttpController {
  constructor(private readonly service: DeleteUserService) {}

  @Delete(routes.user.id)
  @Authorized()
  async deleteUser(
    @Param('id') id: string,
    @User() user: UserPrincipal,
  ): Promise<void> {
    const command = new DeleteUserCommand({ userId: id });
    if (user) await this.service.delete(command, user);
  }
}

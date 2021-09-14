import { routes } from '@config/app.routes';
import { Authorized } from '@core/decorators/authorized.decorator';
import { User } from '@core/decorators/user.decorator';
import { UpdatePasswordCommand } from '@modules/auth/use-cases/update-password/update-password.command';
import { UpdatePasswordRequest } from '@modules/auth/use-cases/update-password/update-password.request.dto';
import { UpdatePasswordService } from '@modules/auth/use-cases/update-password/update-password.service';
import { Body, Controller, Put } from '@nestjs/common';
import { UserPrincipal } from '../../../../interface-adapters/interfaces/auth/user-principal.interface';

@Controller()
export class UpdatePasswordHttpController {
  constructor(private readonly updatePasswordService: UpdatePasswordService) {}

  @Put(routes.auth.password)
  @Authorized()
  async updatePassword(
    @Body() body: UpdatePasswordRequest,
    @User() user: UserPrincipal,
  ): Promise<void> {
    const command = new UpdatePasswordCommand({
      id: user.id,
      password: body.password,
    });
    return this.updatePasswordService.updatePassword(command);
  }
}

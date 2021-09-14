import { routes } from '@config/app.routes';
import { Authorized } from '@core/decorators/authorized.decorator';
import { User } from '@core/decorators/user.decorator';
import { UserRepository } from '@modules/user/database/user.repository';
import { UserResponse } from '@modules/user/dtos/user.response.dto';
import { Controller, Get } from '@nestjs/common';
import { UserPrincipal } from '../../../../interface-adapters/interfaces/auth/user-principal.interface';

@Controller()
export class GetCurrentUserHttpController {
  constructor(private readonly userRepo: UserRepository) {}

  @Get(routes.user.me)
  @Authorized()
  async getCurrent(@User() user: UserPrincipal): Promise<UserResponse> {
    const foundUser = await this.userRepo.findOneByIdOrThrow(user.id);
    return new UserResponse(foundUser);
  }
}

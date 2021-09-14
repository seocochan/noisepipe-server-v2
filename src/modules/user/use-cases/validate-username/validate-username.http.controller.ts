import { routes } from '@config/app.routes';
import { UserRepository } from '@modules/user/database/user.repository';
import { UserAvailabilityResponse } from '@modules/user/dtos/user-availability.response.dto';
import { ValidateUsernameRequest } from '@modules/user/use-cases/validate-username/validate-username.request.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller()
export class ValidateUsernameHttpController {
  constructor(private readonly userRepo: UserRepository) {}

  @Post(routes.user.validateUsername)
  async validateUsername(
    @Body() { username }: ValidateUsernameRequest,
  ): Promise<UserAvailabilityResponse> {
    const user = await this.userRepo.findOneByUsername(username);
    return new UserAvailabilityResponse(!user);
  }
}

import { routes } from '@config/app.routes';
import { UserRepository } from '@modules/user/database/user.repository';
import { UserResponse } from '@modules/user/dtos/user.response.dto';
import { Body, Controller, Get } from '@nestjs/common';
import { FindUserByEmailRequest } from './find-user-by-email.request.dto';

@Controller()
export class FindUserByEmailHttpController {
  constructor(private readonly userRepo: UserRepository) {}

  /* Since this is a simple query with no additional business
     logic involved, it bypasses application's core completely 
     and retrieves user directly from repository.
   */
  @Get(routes.user.root)
  async findByEmail(
    @Body() { email }: FindUserByEmailRequest,
  ): Promise<UserResponse> {
    const user = await this.userRepo.findOneByEmailOrThrow(email);

    /* Returning a Response class which is responsible
       for whitelisting data that is sent to the user */
    return new UserResponse(user);
  }
}

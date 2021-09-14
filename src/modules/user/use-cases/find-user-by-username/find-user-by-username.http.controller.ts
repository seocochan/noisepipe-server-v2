import { routes } from '@config/app.routes';
import { NotFoundException } from '@exceptions';
import { UserRepository } from '@modules/user/database/user.repository';
import { UserResponse } from '@modules/user/dtos/user.response.dto';
import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class FindUserByUsernameHttpController {
  constructor(private readonly userRepo: UserRepository) {}

  @Get(routes.user.username)
  async findByUsername(
    @Param('username') username: string,
  ): Promise<UserResponse> {
    const foundUser = await this.userRepo.findOneByUsername(username);
    if (!foundUser) {
      throw new NotFoundException(`User not found`);
    }
    return new UserResponse(foundUser);
  }
}

import { routes } from '@config/app.routes';
import { UserResponse } from '@modules/user/dtos/user.response.dto';
import { SearchUserCommand } from '@modules/user/use-cases/search-users/search-user.command';
import { SearchUserRequest } from '@modules/user/use-cases/search-users/search-user.request.dto';
import { SearchUserService } from '@modules/user/use-cases/search-users/search-user.service';
import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { PageResponse } from '../../../../interface-adapters/dtos/page.response.dto';

@Controller()
export class SearchUsersHttpController {
  constructor(private readonly searchUserService: SearchUserService) {}

  @Get(routes.user.root)
  async search(
    @Query(new ValidationPipe({ transform: true }))
    query: SearchUserRequest,
  ): Promise<PageResponse<UserResponse>> {
    const command = new SearchUserCommand({
      query: query.q,
      page: query.page,
      size: query.size,
    });
    return this.searchUserService.searchUser(command);
  }
}

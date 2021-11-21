import { routes } from '@config/app.routes';
import { UserResponse } from '@modules/user/dtos/user.response.dto';
import { SearchUsersCommand } from '@modules/user/use-cases/search-users/search-users.command';
import { SearchUsersRequest } from '@modules/user/use-cases/search-users/search-users.request.dto';
import { SearchUsersService } from '@modules/user/use-cases/search-users/search-users.service';
import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { PageResponse } from '../../../../interface-adapters/dtos/page.response.dto';

@Controller()
export class SearchUsersHttpController {
  constructor(private readonly service: SearchUsersService) {}

  @Get(routes.user.root)
  async search(
    @Query(new ValidationPipe({ transform: true }))
    query: SearchUsersRequest,
  ): Promise<PageResponse<UserResponse>> {
    const command = new SearchUsersCommand({
      query: query.q,
      page: query.page,
      size: query.size,
    });
    return this.service.searchUsers(command);
  }
}

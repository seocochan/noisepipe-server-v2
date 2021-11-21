import { OrderDirection } from '@core/ports/repository.ports';
import { UserRepositoryPort } from '@modules/user/database/user.repository.interface';
import { Username } from '@modules/user/domain/value-objects/username.value-object';
import { UserResponse } from '@modules/user/dtos/user.response.dto';
import { SearchUsersCommand } from '@modules/user/use-cases/search-users/search-users.command';
import { Injectable } from '@nestjs/common';
import { PageResponse } from '../../../../interface-adapters/dtos/page.response.dto';

@Injectable()
export class SearchUsersService {
  constructor(private readonly userRepo: UserRepositoryPort) {}

  async searchUsers(
    command: SearchUsersCommand,
  ): Promise<PageResponse<UserResponse>> {
    const [users, count] = await this.userRepo.findManyPaginated({
      params: { usernameLike: new Username(command.query) },
      pagination: {
        limit: command.size,
        offset: (command.page - 1) * command.size,
      },
      orderBy: {
        createdAt: OrderDirection.DESC,
      },
    });
    return new PageResponse({
      data: users.map((user) => new UserResponse(user)),
      total: count,
      size: command.size,
      page: command.page,
    });
  }
}

import { OrderDirection } from '@core/ports/repository.ports';
import { UserRepositoryPort } from '@modules/user/database/user.repository.interface';
import { Username } from '@modules/user/domain/value-objects/username.value-object';
import { UserResponse } from '@modules/user/dtos/user.response.dto';
import { SearchUserCommand } from '@modules/user/use-cases/search-users/search-user.command';
import { Injectable } from '@nestjs/common';
import { PageResponse } from '../../../../interface-adapters/dtos/page.response.dto';

@Injectable()
export class SearchUserService {
  constructor(private readonly userRepo: UserRepositoryPort) {}

  async searchUser(
    command: SearchUserCommand,
  ): Promise<PageResponse<UserResponse>> {
    const userPage = await this.userRepo.findManyPaginated({
      params: { usernameLike: new Username(command.query) },
      pagination: {
        offset: (command.page - 1) * command.size,
        limit: command.size,
      },
      orderBy: {
        createdAt: OrderDirection.DESC,
      },
    });
    return PageResponse.of(userPage, (user) => new UserResponse(user));
  }
}

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserRoleOrmEntity } from '@modules/user/database/user-role.orm-entity';
import { FindUserByUsernameHttpController } from '@modules/user/use-cases/find-user-by-username/find-user-by-username.http.controller';
import { GetCurrentUserHttpController } from '@modules/user/use-cases/get-current-user/get-current-user.http.controller';
import { DeleteUserService } from '@modules/user/use-cases/remove-user/delete-user.service';
import { SearchUserService } from '@modules/user/use-cases/search-users/search-user.service';
import { SearchUsersHttpController } from '@modules/user/use-cases/search-users/search-users.http.controller';
import { ValidateUsernameHttpController } from '@modules/user/use-cases/validate-username/validate-username.http.controller';
import {
  userRepositoryPortProvider,
  userRoleRepositoryPortProvider,
} from '@modules/user/user.providers';
import { Module } from '@nestjs/common';
import { UserOrmEntity } from './database/user.orm-entity';
import { UserRepository } from './database/user.repository';
import { DeleteUserHttpController } from './use-cases/remove-user/delete-user.controller';

@Module({
  imports: [MikroOrmModule.forFeature([UserOrmEntity, UserRoleOrmEntity])],
  controllers: [
    ValidateUsernameHttpController,
    GetCurrentUserHttpController,
    FindUserByUsernameHttpController,
    SearchUsersHttpController,
    DeleteUserHttpController,
  ],
  providers: [
    UserRepository,
    userRepositoryPortProvider,
    userRoleRepositoryPortProvider,
    SearchUserService,
    DeleteUserService,
  ],
  exports: [userRepositoryPortProvider, userRoleRepositoryPortProvider],
})
export class UserModule {}

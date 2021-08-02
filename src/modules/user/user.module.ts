import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CreateUserService } from '@modules/user/use-cases/create-user/create-user.service';
import { DeleteUserService } from '@modules/user/use-cases/remove-user/delete-user.service';
import { userRepositoryPortProvider } from '@modules/user/user.providers';
import { Module } from '@nestjs/common';
import { UserOrmEntity } from './database/user.orm-entity';
import { UserRepository } from './database/user.repository';
import { CreateUserHttpController } from './use-cases/create-user/create-user.http.controller';
import { FindUserByEmailHttpController } from './use-cases/find-user-by-email/find-user-by-email.http.controller';
import { DeleteUserHttpController } from './use-cases/remove-user/delete-user.controller';

@Module({
  imports: [MikroOrmModule.forFeature([UserOrmEntity])],
  controllers: [
    CreateUserHttpController,
    DeleteUserHttpController,
    FindUserByEmailHttpController,
  ],
  providers: [
    UserRepository,
    userRepositoryPortProvider,
    CreateUserService,
    DeleteUserService,
  ],
})
export class UserModule {}

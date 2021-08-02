import { UserRepository } from '@modules/user/database/user.repository';
import { UserRepositoryPort } from '@modules/user/database/user.repository.interface';
import { Provider } from '@nestjs/common';

export const userRepositoryPortProvider: Provider = {
  provide: UserRepositoryPort,
  useClass: UserRepository,
};

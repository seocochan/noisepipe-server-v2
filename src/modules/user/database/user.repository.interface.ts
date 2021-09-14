import { UserQueryParams } from '@modules/user/database/user.repository';
import { RepositoryPort } from 'src/core/ports/repository.ports';
import { UserEntity } from '../domain/entities/user.entity';

/* Repository port belongs to application's core, but since it usually
 changes together with repository it is kept in the same directory for
 convenience. */
export abstract class UserRepositoryPort extends RepositoryPort<
  UserEntity,
  UserQueryParams
> {
  abstract findOneByUsername(username: string): Promise<UserEntity | null>;

  abstract findOneByUsernameOrThrow(username: string): Promise<UserEntity>;

  abstract exists(username: string): Promise<boolean>;
}

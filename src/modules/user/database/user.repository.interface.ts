import { RepositoryPort } from 'src/core/ports/repository.ports';
import { UserEntity, UserProps } from '../domain/entities/user.entity';

/* Repository port belongs to application's core, but since it usually
 changes together with repository it is kept in the same directory for
 convenience. */
export abstract class UserRepositoryPort extends RepositoryPort<
  UserEntity,
  UserProps
> {
  abstract findOneByUsername(username: string): Promise<UserEntity | null>;

  abstract findOneByEmailOrThrow(email: string): Promise<UserEntity>;

  abstract exists(email: string): Promise<boolean>;
}

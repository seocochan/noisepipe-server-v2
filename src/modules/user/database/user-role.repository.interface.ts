import { RepositoryPort } from '@core/ports/repository.ports';
import { UserRoleQueryParams } from '@modules/user/database/user-role.repository';
import { UserRoleEntity } from '@modules/user/domain/entities/user-role.entity';
import { UserRoleName } from '@modules/user/domain/enums/user-role-name.enum';

export abstract class UserRoleRepositoryPort extends RepositoryPort<
  UserRoleEntity,
  UserRoleQueryParams
> {
  abstract findOneByName(name: UserRoleName): Promise<UserRoleEntity | null>;
}

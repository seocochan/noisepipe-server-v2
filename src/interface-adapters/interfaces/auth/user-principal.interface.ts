import { UserRoleName } from '@modules/user/domain/enums/user-role-name.enum';

export interface UserPrincipal {
  id: string;
  username: string;
  roles: UserRoleName[];
}

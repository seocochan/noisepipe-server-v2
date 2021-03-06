import { UserRoleName } from '@modules/user/domain/enums/user-role-name.enum';

export interface UserToken {
  sub: string;
  iat?: string;
  exp?: string;
  id: string;
  username: string;
  roles: UserRoleName[];
}

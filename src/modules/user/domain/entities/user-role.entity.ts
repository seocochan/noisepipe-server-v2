import { Entity } from '@core/base-classes/entity.base';
import { UserRoleName } from '@modules/user/domain/enums/user-role-name.enum';

export interface UserRoleProps {
  name: UserRoleName;
}

// TODO: remove unneccessary audit from entity
export class UserRoleEntity extends Entity<UserRoleProps> {
  constructor(props: UserRoleProps) {
    super(props);
  }

  get name(): UserRoleName {
    return this.props.name;
  }
}

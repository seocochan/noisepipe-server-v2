import { UserRoleEntity } from '@modules/user/domain/entities/user-role.entity';
import { Password } from '@modules/user/domain/value-objects/password.value-object';
import { Username } from '@modules/user/domain/value-objects/username.value-object';
import { AggregateRoot } from 'src/core/base-classes/aggregate-root.base';

export interface UserProps {
  username: Username;
  password: Password;
  roles: UserRoleEntity[];
}

export class UserEntity extends AggregateRoot<UserProps> {
  constructor(props: UserProps) {
    super(props);
  }

  get username(): Username {
    return this.props.username;
  }

  get password(): Password {
    return this.props.password;
  }

  get roles(): UserRoleEntity[] {
    return this.props.roles;
  }

  updatePassword(password: Password): void {
    this.props.password = password;
  }

  static validate(props: UserProps): void {
    // TODO: example
    // entity business rules validation to protect it's invariant
  }
}

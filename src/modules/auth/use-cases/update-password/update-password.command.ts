import { ID } from '@core/value-objects/id.value-object';
import { Password } from '@modules/user/domain/value-objects/password.value-object';

export interface UpdatePasswordProps {
  id: string;
  password: string;
}

export class UpdatePasswordCommand {
  constructor(props: UpdatePasswordProps) {
    this.id = new ID(props.id);
    this.password = Password.encode(props.password);
  }

  readonly id: ID;
  readonly password: Password;
}

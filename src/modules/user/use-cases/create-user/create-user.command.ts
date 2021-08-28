import { Password } from '@modules/user/domain/value-objects/password.value-object';
import { Username } from '@modules/user/domain/value-objects/username.value-object';
import {
  Address,
  AddressProps,
} from '../../domain/value-objects/address.value-object';
import { Email } from '../../domain/value-objects/email.value-object';

export interface CreateUserProps {
  username: string;
  password: string;
  email: string;
  address: AddressProps;
}

export class CreateUserCommand {
  constructor(props: CreateUserProps) {
    this.username = new Username(props.username);
    this.password = new Password(props.password);
    this.email = new Email(props.email);
    this.address = new Address(props.address);
  }

  readonly username: Username;
  readonly password: Password;
  readonly email: Email;
  readonly address: Address;
}

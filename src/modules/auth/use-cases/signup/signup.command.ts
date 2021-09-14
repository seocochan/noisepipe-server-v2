export class SignupCommand {
  constructor(props: SignupCommand) {
    this.username = props.username;
    this.password = props.password;
  }

  readonly username: string;
  readonly password: string;
}

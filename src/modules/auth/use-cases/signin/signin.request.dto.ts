import { Signin } from 'src/interface-adapters/interfaces/auth/signin.interface';

export class SigninRequest implements Signin {
  username!: string;
  password!: string;
}

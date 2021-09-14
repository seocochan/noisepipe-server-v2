import { Length, Matches } from 'class-validator';
import { Signin } from 'src/interface-adapters/interfaces/auth/signin.interface';

export class SigninRequest implements Signin {
  /**
   * Name of user
   * @example 'miku_ito123'
   */
  @Length(5, 20)
  @Matches(/^\w+$/)
  username!: string;

  /**
   * Password of user
   * @example 'sOmeth1ng_very+C0mplic@te'
   */
  @Length(8, 100)
  password!: string;
}

import { Length, Matches } from 'class-validator';
import { Signup } from '../../../../interface-adapters/interfaces/auth/signup.interface';

export class SignupRequest implements Signup {
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

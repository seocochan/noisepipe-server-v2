import { Length, Matches } from 'class-validator';
import { ValidateUsername } from '../../../../interface-adapters/interfaces/user/validate-username.interface';

export class ValidateUsernameRequest implements ValidateUsername {
  /**
   * Name of user
   * @example 'miku_ito123'
   */
  @Length(5, 20)
  @Matches(/^\w+$/)
  username!: string;
}

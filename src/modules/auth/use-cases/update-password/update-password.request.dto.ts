import { Length } from 'class-validator';
import { UpdatePassword } from '../../../../interface-adapters/interfaces/auth/update-password.interface';

export class UpdatePasswordRequest implements UpdatePassword {
  /**
   * Password of user
   * @example 'sOmeth1ng_very+C0mplic@te'
   */
  @Length(8, 100)
  password!: string;
}

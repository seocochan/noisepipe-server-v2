import { IsEmail, MaxLength } from 'class-validator';
import { FindUserByEmail } from 'src/interface-adapters/interfaces/user/find-user-by-email.interface';

export class FindUserByEmailRequest implements FindUserByEmail {
  /**
   * User email address
   * @example 'john@gmail.com'
   */
  @MaxLength(320)
  @IsEmail()
  email!: string;
}

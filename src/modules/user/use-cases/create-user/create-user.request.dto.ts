import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsString,
  MaxLength,
} from 'class-validator';
import { CreateUser } from 'src/interface-adapters/interfaces/user/create.user.interface';

export class CreateUserRequest implements CreateUser {
  /**
   * User email address
   * @example 'miku@ito.com'
   */
  @MaxLength(320)
  @IsEmail()
  email!: string;

  /**
   * Country of residence
   * @example 'Japan'
   */
  @MaxLength(50)
  @IsString()
  @IsAlpha()
  country!: string;

  /**
   * Postal code
   * @example 28566
   */
  @MaxLength(10)
  @IsAlphanumeric()
  postalCode!: string;

  /**
   * Street
   * @example 'Yamatecho'
   */
  @MaxLength(50)
  @IsAlphanumeric()
  street!: string;
}

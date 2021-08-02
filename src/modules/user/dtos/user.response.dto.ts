import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { ResponseBase } from 'src/interface-adapters/base-classes/response.base.dto';
import { User } from 'src/interface-adapters/interfaces/user/user.interface';

export class UserResponse extends ResponseBase implements User {
  constructor(user: UserEntity) {
    super(user);
    /* Whitelisting returned data to avoid leaks.
       If a new property is added, like password or a
       credit card number, it won't be returned
       unless you specifically allow this.
       (avoid blacklisting, which will return everything
        but blacklisted items, which can lead to a data leak).
    */
    this.email = user.email.value;
    this.country = user.address.country;
    this.postalCode = user.address.postalCode;
    this.street = user.address.street;
  }

  /**
   * User's email address
   * @example 'joh-doe@gmail.com'
   */
  email: string;

  /**
   * User's country of residence
   * @example 'France'
   */
  country: string;

  /**
   * Postal code
   * @example '123456'
   */
  postalCode: string;

  /**
   * Street where the user is registered
   * @example 'Park Avenue'
   */
  street: string;
}

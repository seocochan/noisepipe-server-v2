import {
  ArgumentInvalidException,
  ArgumentOutOfRangeException,
} from '@exceptions';
import * as bcrypt from 'bcrypt';
import {
  DomainPrimitive,
  ValueObject,
} from 'src/core/base-classes/value-object.base';
import { Guard } from 'src/core/guard';

export class Password extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = value;
  }

  get value(): string {
    return this.props.value;
  }

  public match(plain: string): boolean {
    return bcrypt.compareSync(plain, this.value);
  }

  static encode(plain: string): Password {
    if (!Guard.lengthIsBetween(plain, 8, 100)) {
      throw new ArgumentOutOfRangeException('password length is out of range');
    }
    return new Password(bcrypt.hashSync(plain, 10));
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.match(value, /^\$2[ayb]\$.{56}$/)) {
      throw new ArgumentInvalidException('Password not encoded');
    }
  }
}

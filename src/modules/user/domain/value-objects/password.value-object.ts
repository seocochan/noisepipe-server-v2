import { ArgumentOutOfRangeException } from '@exceptions';
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

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIsBetween(value, 8, 100)) {
      throw new ArgumentOutOfRangeException('password is out of range');
    }
  }
}

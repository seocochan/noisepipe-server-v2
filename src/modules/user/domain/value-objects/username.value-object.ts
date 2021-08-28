import { ArgumentOutOfRangeException } from '@exceptions';
import {
  DomainPrimitive,
  ValueObject,
} from 'src/core/base-classes/value-object.base';
import { Guard } from 'src/core/guard';

export class Username extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = value;
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIsBetween(value, 5, 20)) {
      throw new ArgumentOutOfRangeException('username is out of range');
    }
  }
}

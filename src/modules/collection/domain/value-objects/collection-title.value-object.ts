import {
  DomainPrimitive,
  ValueObject,
} from '@core/base-classes/value-object.base';
import { Guard } from '@core/guard';
import { ArgumentOutOfRangeException } from '@exceptions';

export class CollectionTitle extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = value;
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIsBetween(value, 1, 40)) {
      throw new ArgumentOutOfRangeException('collection title is out of range');
    }
  }
}

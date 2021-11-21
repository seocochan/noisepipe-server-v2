import {
  DomainPrimitive,
  ValueObject,
} from '@core/base-classes/value-object.base';
import { Guard } from '@core/guard';
import { ArgumentOutOfRangeException } from '@exceptions';

/**
 * TODO:
 * 반드시 한글, 숫자, 영문 소문자, -_로만 구성되어야함
 * static transform, validate 구현
 */
export class CollectionTagName extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = value;
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIsBetween(value, 1, 40)) {
      throw new ArgumentOutOfRangeException(
        'collection tag name is out of range',
      );
    }
  }
}

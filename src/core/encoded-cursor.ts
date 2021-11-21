type CursorProps<K extends readonly string[]> = Record<K[number], string>;

export class EncodedCursor<K extends readonly string[], P = CursorProps<K>> {
  private readonly keys: K;
  private readonly value: string;
  private readonly props: P;

  constructor(value: string, keys: K) {
    this.value = value;
    this.keys = keys;
    const values = Buffer.from(this.value, 'base64')
      .toString('ascii')
      .split(',');
    if (keys.length !== values.length) {
      throw new Error('Invalid cursor');
    }

    const props: Record<string, string> = {};
    this.keys.forEach((key, index) => {
      props[key] = values[index];
    });
    this.props = props as unknown as P;
  }

  static from<K extends readonly string[]>(
    keys: K,
    values: string[],
  ): EncodedCursor<K> {
    if (keys.length !== values.length) {
      throw new Error();
    }

    const value = Buffer.from(values.join(',')).toString('base64');
    return new EncodedCursor(value, keys);
  }

  decode(): P {
    return this.props;
  }

  getValue(): string {
    return this.value;
  }
}

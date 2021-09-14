import { PrimaryKey } from '@mikro-orm/core';

export abstract class OrmEntityBase {
  protected constructor(props?: unknown) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @PrimaryKey()
  id!: string;
}

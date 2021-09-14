import { Property } from '@mikro-orm/core';
import { OrmEntityBase } from './orm.entity.base';

export abstract class OrmDateAuditEntityBase extends OrmEntityBase {
  protected constructor(props?: unknown) {
    super(props);
  }

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}

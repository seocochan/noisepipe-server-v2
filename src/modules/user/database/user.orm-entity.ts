import { Entity, Property, Unique } from '@mikro-orm/core';
import { OrmEntityBase } from 'src/infrastructure/database/base-classes/orm.entity.base';

@Entity({ tableName: 'users' })
export class UserOrmEntity extends OrmEntityBase {
  constructor(props?: UserOrmEntity) {
    super(props);
  }

  @Property()
  @Unique()
  email!: string;

  @Property()
  country!: string;

  @Property()
  postalCode!: string;

  @Property()
  street!: string;
}

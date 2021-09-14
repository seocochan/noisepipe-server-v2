/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntityProps } from 'src/core/base-classes/entity.base';
import { DateVO } from 'src/core/value-objects/date.value-object';
import { ID } from 'src/core/value-objects/id.value-object';
import { OrmDateAuditEntityBase } from './orm-date-audit.entity.base';
import { OrmEntityBase } from './orm.entity.base';

export abstract class OrmMapper<
  TEntity extends BaseEntityProps,
  TOrmEntity extends OrmEntityBase,
> {
  abstract toDomainEntity(ormEntity: TOrmEntity): TEntity;

  abstract toOrmEntity(entity: TEntity): TOrmEntity;

  /** Tricking TypeScript to do mapping from OrmEntity to Entity's protected/private properties.
   * This is done to avoid public setters or accepting all props through constructor.
   * Public setters may corrupt Entity's state. Accepting every property through constructor may
   * conflict with some pre-defined business rules that are validated at object creation.
   * Never use this trick in domain layer. Normally private properties should never be assigned directly.
   */

  /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access*/
  protected assignPropsToDomainEntity<Props>(
    entityCtor: new (...args: any[]) => TEntity,
    entityProps: Props,
    ormEntity: TOrmEntity,
  ): TEntity {
    const entityCopy: any = Object.create(entityCtor.prototype);
    entityCopy.props = entityProps;
    entityCopy._id = new ID(ormEntity.id);
    if (ormEntity instanceof OrmDateAuditEntityBase) {
      entityCopy._createdAt = new DateVO(ormEntity.createdAt);
      entityCopy._updatedAt = new DateVO(ormEntity.updatedAt);
    }

    return entityCopy as unknown as TEntity;
  }
}

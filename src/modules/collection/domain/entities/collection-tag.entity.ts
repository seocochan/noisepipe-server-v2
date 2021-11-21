import { Entity } from '@core/base-classes/entity.base';
import { CollectionTagName } from '@modules/collection/domain/value-objects/collection-tag-name.value-object';

export interface CollectionTagProps {
  name: CollectionTagName;
}

export class CollectionTagEntity extends Entity<CollectionTagProps> {
  constructor(props: CollectionTagProps) {
    super(props);
  }

  get name(): CollectionTagName {
    return this.props.name;
  }
}

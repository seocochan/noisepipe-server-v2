import { AggregateRoot } from '@core/base-classes/aggregate-root.base';
import { ID } from '@core/value-objects/id.value-object';
import { CollectionTagEntity } from '@modules/collection/domain/entities/collection-tag.entity';
import { CollectionDescription } from '@modules/collection/domain/value-objects/collection-description.value-object';
import { CollectionTitle } from '@modules/collection/domain/value-objects/collection-title.value-object';

export interface CollectionProps {
  title: CollectionTitle;
  description: CollectionDescription | null;
  tags: CollectionTagEntity[];
  authorId: ID;
}

export class CollectionEntity extends AggregateRoot<CollectionProps> {
  constructor(props: CollectionProps) {
    super(props);
  }

  get title(): CollectionTitle {
    return this.props.title;
  }

  get description(): CollectionDescription | null {
    return this.props.description;
  }

  get tags(): CollectionTagEntity[] {
    return this.props.tags;
  }

  get authorId(): ID {
    return this.props.authorId;
  }

  updateTitle(title: CollectionTitle): void {
    this.props.title = title;
  }

  updateDescription(description: CollectionDescription): void {
    this.props.description = description;
  }

  updateTags(tags: CollectionTagEntity[]): void {
    this.props.tags = tags;
  }

  static validate(): void {
    // TODO
  }
}

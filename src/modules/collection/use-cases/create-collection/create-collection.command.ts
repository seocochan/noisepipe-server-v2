export class CreateCollectionCommand {
  constructor(props: CreateCollectionCommand) {
    this.title = props.title;
    this.description = props.description;
    this.tags = props.tags;
    this.authorId = props.authorId;
  }

  readonly title: string;
  readonly description?: string;
  readonly tags?: string[];
  readonly authorId: string;
}

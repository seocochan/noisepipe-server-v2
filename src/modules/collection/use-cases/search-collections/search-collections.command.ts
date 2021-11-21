import { EncodedCursor } from '@core/encoded-cursor';

export class SearchCollectionsCommand {
  constructor(props: SearchCollectionsCommand) {
    Object.assign(this, props);
  }

  query!: string;
  cursor?: EncodedCursor<['createdAt', 'id']> | null;
  size!: number;
}

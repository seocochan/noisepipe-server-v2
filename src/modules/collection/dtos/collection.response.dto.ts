import { CollectionEntity } from '@modules/collection/domain/entities/collection.entity';
import { ResponseBase } from '../../../interface-adapters/base-classes/response.base.dto';
import { Collection } from '../../../interface-adapters/interfaces/collection/collection.interface';

export class CollectionResponse extends ResponseBase implements Collection {
  // TODO: 프로퍼티가 user, items 등 추가되었을 때 생성자 변경 필요할듯
  constructor(collection: CollectionEntity) {
    super(collection);
    this.title = collection.title.value;
    this.description = collection.description?.value;
  }

  title: string;
  description?: string;
}

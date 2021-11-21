import { CollectionTagRepository } from '@modules/collection/database/collection-tag.repository';
import { CollectionTagRepositoryPort } from '@modules/collection/database/collection-tag.repository.interface';
import { CollectionRepository } from '@modules/collection/database/collection.repository';
import { CollectionRepositoryPort } from '@modules/collection/database/collection.repository.interface';
import { Provider } from '@nestjs/common';

export const collectionRepositoryPortProvider: Provider = {
  provide: CollectionRepositoryPort,
  useClass: CollectionRepository,
};

export const collectionTagRepositoryPortProvider: Provider = {
  provide: CollectionTagRepositoryPort,
  useClass: CollectionTagRepository,
};

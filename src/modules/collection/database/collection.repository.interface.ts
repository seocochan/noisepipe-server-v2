import { RepositoryPort } from '@core/ports/repository.ports';
import { CollectionQueryParams } from '@modules/collection/database/collection.repository';
import { CollectionEntity } from '@modules/collection/domain/entities/collection.entity';

export abstract class CollectionRepositoryPort extends RepositoryPort<
  CollectionEntity,
  CollectionQueryParams
> {}

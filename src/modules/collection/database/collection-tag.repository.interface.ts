import { RepositoryPort } from '@core/ports/repository.ports';
import { CollectionTagQueryParams } from '@modules/collection/database/collection-tag.repository';
import { CollectionTagEntity } from '@modules/collection/domain/entities/collection-tag.entity';

export abstract class CollectionTagRepositoryPort extends RepositoryPort<
  CollectionTagEntity,
  CollectionTagQueryParams
> {}

import { Transactional } from '@core/decorators/transactional.decorator';
import { EncodedCursor } from '@core/encoded-cursor';
import { OrderDirection } from '@core/ports/repository.ports';
import { DateVO } from '@core/value-objects/date.value-object';
import { ID } from '@core/value-objects/id.value-object';
import { CollectionQueryParams } from '@modules/collection/database/collection.repository';
import { CollectionRepositoryPort } from '@modules/collection/database/collection.repository.interface';
import { CollectionTagName } from '@modules/collection/domain/value-objects/collection-tag-name.value-object';
import { CollectionTitle } from '@modules/collection/domain/value-objects/collection-title.value-object';
import { CollectionResponse } from '@modules/collection/dtos/collection.response.dto';
import { SearchCollectionsCommand } from '@modules/collection/use-cases/search-collections/search-collections.command';
import { Injectable } from '@nestjs/common';
import { CursorResponse } from '../../../../interface-adapters/dtos/cursor.response.dto';

@Injectable()
export class SearchCollectionsService {
  constructor(private readonly collectionRepo: CollectionRepositoryPort) {}

  @Transactional()
  async searchCollections(
    command: SearchCollectionsCommand,
  ): Promise<CursorResponse<CollectionResponse>> {
    const decodedCursor = command.cursor?.decode();
    const cursor = decodedCursor
      ? {
          createdAt: new DateVO(decodedCursor.createdAt),
          id: new ID(decodedCursor.id),
        }
      : null;

    const condition: CollectionQueryParams = {
      titleOrTagNameLike: {
        title: new CollectionTitle(command.query),
        tagName: new CollectionTagName(command.query),
      },
    };
    const [[collections], count] = await Promise.all([
      this.collectionRepo.findManyPaginated({
        params: {
          ...condition,
          cursorNext: cursor ? cursor : undefined,
        },
        orderBy: {
          createdAt: OrderDirection.DESC,
          id: OrderDirection.ASC,
        },
        pagination: {
          limit: command.size + 1,
        },
      }),
      this.collectionRepo.count(condition),
    ]);

    const nextItem = collections[command.size];
    collections.splice(command.size);
    const nextCursor = nextItem
      ? EncodedCursor.from(['createdAt', 'id'] as const, [
          nextItem.createdAt.value.toISOString(),
          nextItem.id.value,
        ]).getValue()
      : null;
    return new CursorResponse({
      data: collections.map((it) => new CollectionResponse(it)),
      total: count,
      size: command.size,
      cursor: command.cursor?.getValue() ?? null,
      nextCursor,
    });
  }
}

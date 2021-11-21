import { routes } from '@config/app.routes';
import { EncodedCursor } from '@core/encoded-cursor';
import { CollectionResponse } from '@modules/collection/dtos/collection.response.dto';
import { SearchCollectionsCommand } from '@modules/collection/use-cases/search-collections/search-collections.command';
import { SearchCollectionsRequest } from '@modules/collection/use-cases/search-collections/search-collections.request.dto';
import { SearchCollectionsService } from '@modules/collection/use-cases/search-collections/search-collections.service';
import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { CursorResponse } from '../../../../interface-adapters/dtos/cursor.response.dto';

@Controller()
export class SearchCollectionsHttpController {
  constructor(private readonly service: SearchCollectionsService) {}

  @Get(routes.collection.root)
  async search(
    @Query(new ValidationPipe({ transform: true }))
    query: SearchCollectionsRequest,
  ): Promise<CursorResponse<CollectionResponse>> {
    const command = new SearchCollectionsCommand({
      query: query.q,
      cursor: query.cursor
        ? new EncodedCursor(query.cursor, ['createdAt', 'id'])
        : null,
      size: query.size,
    });
    return this.service.searchCollections(command);
  }
}

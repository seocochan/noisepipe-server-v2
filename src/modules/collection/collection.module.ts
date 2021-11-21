import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  collectionRepositoryPortProvider,
  collectionTagRepositoryPortProvider,
} from '@modules/collection/collection.providers';
import { CollectionTagOrmEntity } from '@modules/collection/database/collection-tag.orm-entity';
import { CollectionOrmEntity } from '@modules/collection/database/collection.orm-entity';
import { CollectionRepository } from '@modules/collection/database/collection.repository';
import { CreateCollectionHttpController } from '@modules/collection/use-cases/create-collection/create-collection.http.controller';
import { SearchCollectionsHttpController } from '@modules/collection/use-cases/search-collections/search-collections.http.controller';
import { SearchCollectionsService } from '@modules/collection/use-cases/search-collections/search-collections.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MikroOrmModule.forFeature([CollectionOrmEntity, CollectionTagOrmEntity]),
  ],
  controllers: [
    CreateCollectionHttpController,
    SearchCollectionsHttpController,
  ],
  providers: [
    CollectionRepository,
    collectionRepositoryPortProvider,
    collectionTagRepositoryPortProvider,
    SearchCollectionsService,
  ],
  exports: [],
})
export class CollectionModule {}

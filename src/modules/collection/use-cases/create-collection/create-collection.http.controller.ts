import { routes } from '@config/app.routes';
import { Authorized } from '@core/decorators/authorized.decorator';
import { Transactional } from '@core/decorators/transactional.decorator';
import { User } from '@core/decorators/user.decorator';
import { ID } from '@core/value-objects/id.value-object';
import { CollectionRepository } from '@modules/collection/database/collection.repository';
import { CollectionEntity } from '@modules/collection/domain/entities/collection.entity';
import { CollectionDescription } from '@modules/collection/domain/value-objects/collection-description.value-object';
import { CollectionTitle } from '@modules/collection/domain/value-objects/collection-title.value-object';
import { CollectionResponse } from '@modules/collection/dtos/collection.response.dto';
import { CreateCollectionCommand } from '@modules/collection/use-cases/create-collection/create-collection.command';
import { CreateCollectionRequest } from '@modules/collection/use-cases/create-collection/create-collection.request.dto';
import { UserRoleName } from '@modules/user/domain/enums/user-role-name.enum';
import { Body, Controller, Post } from '@nestjs/common';
import { UserPrincipal } from '../../../../interface-adapters/interfaces/auth/user-principal.interface';

@Controller()
export class CreateCollectionHttpController {
  constructor(private readonly collectionRepo: CollectionRepository) {}

  @Post(routes.user.usernameCollection)
  @Authorized(UserRoleName.USER)
  @Transactional() // TODO: remove
  async createCollection(
    @Body() body: CreateCollectionRequest,
    @User() user: UserPrincipal,
  ) {
    // TODO: query.username == user.username
    const command = new CreateCollectionCommand({
      title: body.title,
      description: body.description,
      tags: body.tags,
      authorId: user.id,
    });
    const collection = new CollectionEntity({
      title: new CollectionTitle(command.title),
      description: command.description
        ? new CollectionDescription(command.description)
        : null,
      authorId: new ID(command.authorId),
      tags: [], // TODO: assign tags entity,
    });
    const created = await this.collectionRepo.save(collection);
    return new CollectionResponse(created);
  }
}

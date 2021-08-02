import { routes } from '@config/app.routes';
import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteUserService } from './delete-user.service';

@Controller()
export class DeleteUserHttpController {
  constructor(private readonly service: DeleteUserService) {}

  @Delete(routes.user.delete)
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.service.delete(id);
  }
}

import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { UserRoleName } from '@modules/user/domain/enums/user-role-name.enum';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

export function Authorized(...roles: UserRoleName[]): MethodDecorator {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}

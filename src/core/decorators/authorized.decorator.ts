import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { SetMetadata, UseGuards } from '@nestjs/common';

export function Authorized(...roles: string[]): MethodDecorator {
  return function (target, propertyKey, descriptor): void {
    SetMetadata('roles', roles)(target, propertyKey, descriptor);
    UseGuards(JwtAuthGuard)(target, propertyKey, descriptor);
    UseGuards(RolesGuard)(target, propertyKey, descriptor);
  };
}

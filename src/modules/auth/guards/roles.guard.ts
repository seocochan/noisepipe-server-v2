import { UserRoleName } from '@modules/user/domain/enums/user-role-name.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoleName[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<Request>();
    if (!user) {
      throw new Error(
        'Request.user not assigned. JwtAuthGuard must be called before.',
      );
    }
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}

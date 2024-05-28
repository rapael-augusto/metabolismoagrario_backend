import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User, UserRoles } from '@prisma/client';
import { ROLES_KEY } from '../decorators/user-role-decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<UserRoles>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);


    if (!requiredRole) {
      return true;
    }

    const { user }: { user: User } = context.switchToHttp().getRequest();
    return requiredRole === user.role
  }
}
import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Role = (role: UserRoles) => SetMetadata(ROLES_KEY, role);
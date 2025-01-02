import { UserRoles } from '@prisma/client';
import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: UserRoles;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

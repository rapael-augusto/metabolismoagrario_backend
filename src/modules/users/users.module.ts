// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/prisma.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { User, UserRoles } from '@prisma/client';
import { Role } from 'src/auth/decorators/user-role-decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { CurrentUser } from 'src/auth/decorators/current-user-decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Role(UserRoles.ADMIN)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @Role(UserRoles.ADMIN)
  async findAll(@CurrentUser() user: User) {
    return await this.usersService.findAll(user);
  }

  @Patch('/profile')
  async updateProfile(@CurrentUser() user: User, @Body() data: UpdateUserDto) {
    return await this.usersService.updateProfile(user, data);
  }

  @Get(':id')
  @Role(UserRoles.ADMIN)
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @Role(UserRoles.ADMIN)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @Role(UserRoles.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}

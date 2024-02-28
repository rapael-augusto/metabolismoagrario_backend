import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { PublicRoute } from 'src/auth/decorators/public-route-decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @PublicRoute() // TODO remove (it's public just fow now for simplicity)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'node:crypto';
import { hash as bcryptHash } from 'bcrypt';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcryptHash(createUserDto.password, 8);

    const currentDate = new Date();

    const user = await this.userRepository.create({
      id: randomUUID(),
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword,
      refreshToken: null,
      role: createUserDto.role,
      createdAt: currentDate,
      updatedAt: currentDate,
    });

    return { ...user, password: undefined };
  }

  async findAll() {
    return (await this.userRepository.list()).map(user => ({ ...user, password: undefined, refreshToken: undefined }));
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: string): Promise<User> {
    return this.userRepository.delete(id);
  }
}

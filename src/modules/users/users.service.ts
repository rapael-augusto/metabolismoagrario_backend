import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'node:crypto';
import { hash as bcryptHash, compare } from 'bcrypt';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
    } catch (error) {}
    const userExists = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (userExists) {
      throw new ConflictException('User already exists');
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
    return (await this.userRepository.list()).map((user) => ({
      ...user,
      password: undefined,
      refreshToken: undefined,
    }));
  }

  async findOne(id: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('Usuário não foi encontrado.');
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<UserResponseDto> {
    console.log(data);
    const { email, password, oldPassword } = data;
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundException('Usuário não foi encontrado.');

    if (email && email !== user.email) {
      const emailInUse = await this.userRepository.findByEmail(email);
      if (emailInUse) {
        throw new ConflictException('Um usuário já existe com esse e-mail.');
      }
    }

    if (oldPassword && password) {
      const passwordMatch = await compare(oldPassword, user.password);
      if (!passwordMatch) {
        throw new ConflictException('Senha antiga não corresponde.');
      }
      data.password = await bcryptHash(password, 8);
    }

    delete data.oldPassword;

    const userData = await this.userRepository.update(id, data);

    return plainToInstance(UserResponseDto, userData, {
      excludeExtraneousValues: true,
    });
  }

  async deleteUser(id: string): Promise<User> {
    return this.userRepository.delete(id);
  }
}

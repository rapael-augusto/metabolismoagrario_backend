import { PasswordResetRepository } from '@db/repositories/password-reset.repository';
import { UserRepository } from '@db/repositories/user.repository';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import * as crypto from 'crypto';
import { CreatePasswordResetDTO } from './dto/password-reset-create.dto';
import { EmailService } from '@modules/email/email.service';
import { resetPasswordMail } from 'src/emails/reset-password.template';

@Injectable()
export class PasswordResetService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
    private passwordResetRepository: PasswordResetRepository,
  ) {}

  async isTokenExpired(createdAt: Date) {
    const expirationTime = parseInt(
      process.env.PASSWORD_RESET_TOKEN_EXPIRATION ?? '1800000',
      10,
    );
    const currentTime = new Date().getTime();
    const tokenAge = currentTime - new Date(createdAt).getTime();
    return tokenAge > expirationTime;
  }

  async create(data: CreatePasswordResetDTO) {
    try {
      const user = await this.userRepository.findByEmail(data.email);
      if (!user) throw new NotFoundException('User not found!');
      const existingToken = await this.passwordResetRepository.findByUserId(
        user.id,
      );
      if (existingToken) await this.passwordResetRepository.delete(user.id);
      const token = crypto.randomBytes(32).toString('hex');
      await this.emailService.sendEmail(
        data.email,
        'Recuperação de senha',
        resetPasswordMail(token),
      );
      await this.passwordResetRepository.create({
        user: { connect: { id: user.id } },
        token,
      });
      return 'CREATED';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getValidExistingToken(token: string) {
    const existingToken = await this.passwordResetRepository.findByToken(token);
    if (!existingToken) throw new NotFoundException('Reset token not found!');
    // Se o token estiver expirado, deleta ele do banco
    if (await this.isTokenExpired(existingToken.createdAt)) {
      await this.passwordResetRepository.delete(existingToken.userId);
      throw new ConflictException('Reset token is expired!');
    }
    return existingToken;
  }

  async resetPassword(data: { token: string; password: string }) {
    try {
      const { token, password } = data;
      const validToken = await this.getValidExistingToken(token);
      const passwordHash = await hash(password, 8);
      await this.userRepository.update(validToken.userId, {
        password: passwordHash,
      });
      await this.passwordResetRepository.delete(validToken.userId);
      return 'OK';
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      } else {
        throw new BadRequestException(error.message);
      }
    }
  }
}

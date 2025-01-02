import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { CreatePasswordResetDTO } from './dto/password-reset-create.dto';
import { ResetPasswordDTO } from './dto/password-reset.dto';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private passwordResetService: PasswordResetService) {}

  @Post()
  async create(@Body() data: CreatePasswordResetDTO) {
    return await this.passwordResetService.create(data);
  }

  @Post(':token')
  async resetPassword(
    @Param('token') token: string,
    @Body() data: ResetPasswordDTO,
  ) {
    return await this.passwordResetService.resetPassword({
      token,
      ...data,
    });
  }

  @Get(':token')
  async validateToken(@Param('token') token: string) {
    return await this.passwordResetService.getValidExistingToken(token);
  }
}

import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { jwtConstants } from './constants';
import { RefreshJwtStrategy } from './refresh-jwt.strategy';
import { RoleGuard } from './guards/role.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.jwtSecret,
      signOptions: {
        algorithm: 'HS256',
      },
    }),
  ],
  providers: [
    JwtStrategy,
    RefreshJwtStrategy,
    {
      provide: APP_GUARD, // defaultly protecting all with JwtAuthGuard
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [JwtModule],
})
export class AuthModule {}

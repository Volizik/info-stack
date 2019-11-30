import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy} from './jwt.strategy';
import * as config from 'config';
import {AuthController} from './auth.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthRepository} from './auth.repository';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      // signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([AuthRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [
      JwtStrategy,
      PassportModule
  ],
})
export class AuthModule {}

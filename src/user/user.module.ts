import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRepository} from './user.repository';
import {AuthModule} from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    AuthModule
  ],
  providers: [UserService],
  exports: [
      UserService,
  ],
})
export class UserModule {}
import { Module } from '@nestjs/common';
import { WorkersController } from './workers.controller';
import { WorkersService } from './workers.service';
import {AuthModule} from '../auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {WorkersRepository} from './workers.repository';

@Module({
  imports: [
      AuthModule,
      TypeOrmModule.forFeature([WorkersRepository])
  ],
  controllers: [WorkersController],
  providers: [WorkersService]
})
export class WorkersModule {}

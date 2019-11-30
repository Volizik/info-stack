import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import { WorkersModule } from './workers/workers.module';
import {UsersModule} from './users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        AuthModule,
        WorkersModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

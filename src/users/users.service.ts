import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UsersRepository} from './users.repository';
import {User} from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository,
    ) {}

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findByEmail(email);
    }
}

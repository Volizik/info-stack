import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from './user.repository';
import {User} from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findByEmail(email);
    }
}

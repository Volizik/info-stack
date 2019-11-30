import {Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import {UserRegistrationDto} from './dto/user-registration.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {AuthRepository} from './auth.repository';
import {UserLoginDto} from './dto/user-login.dto';
import {JwtPayload} from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(AuthRepository)
        private readonly authRepository: AuthRepository,
    ) {}

    async login(userLoginDto: UserLoginDto): Promise<{ accessToken: string }> {
        const email = await this.authRepository.validateUserPassword(userLoginDto);

        if (!email) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { email };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }

    async registration(userRegistrationDto: UserRegistrationDto): Promise<User> {
       return this.authRepository.registration(userRegistrationDto);
    }
}

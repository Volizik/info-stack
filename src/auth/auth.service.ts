import {Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UserCredentialsDto} from '../user/dto/user-credentials.dto';
import { User } from '../user/user.entity';
import {UserRegistrationDto} from './dto/user-registration.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {AuthRepository} from './auth.repository';
import {UserLoginDto} from './dto/user-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(AuthRepository)
        private readonly authRepository: AuthRepository,
    ) {}

    async login(userLoginDto: UserLoginDto) {
        const userEmail = await this.authRepository.validateUserPassword(userLoginDto);

        if (!userEmail) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = await this.jwtService.sign({userEmail});
        return { accessToken };
    }

    async registration(userRegistrationDto: UserRegistrationDto): Promise<User> {
       return this.authRepository.registration(userRegistrationDto);
    }
}

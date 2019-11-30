import {Body, Controller, Logger, Post, ValidationPipe} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserRegistrationDto} from './dto/user-registration.dto';
import {UserLoginDto} from './dto/user-login.dto';

@Controller('auth')
export class AuthController {

    private readonly logger = new Logger('AuthController');

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body(ValidationPipe) userLoginDto: UserLoginDto) {
        return this.authService.login(userLoginDto);
    }

    @Post('registration')
    async registration(@Body(ValidationPipe) userRegistrationDto: UserRegistrationDto) {
        return this.authService.registration(userRegistrationDto);
    }

}

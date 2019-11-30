import {IsEmail, IsString} from 'class-validator';

export class UserRegistrationDto {

    @IsEmail()
    email: string;

    @IsString()
    password: string;

}

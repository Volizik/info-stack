import {IsEmail, IsNotEmpty, IsOptional} from 'class-validator';

export class CreateWorkerDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    surname: string;

    @IsOptional()
    age: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    description: string;

    @IsOptional()
    photo: string;
}

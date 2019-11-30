import {EntityRepository, Repository} from 'typeorm';
import {User} from '../user/user.entity';
import {UserRegistrationDto} from './dto/user-registration.dto';
import {ConflictException, InternalServerErrorException} from '@nestjs/common';
import {UserLoginDto} from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
    async registration({ email, password }: UserRegistrationDto): Promise<User> {
        const user = new User();

        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
            delete user.password;
            delete user.salt;
            return user;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async validateUserPassword(userLoginDto: UserLoginDto): Promise<string> {
        const { email, password } = userLoginDto;
        const user = await this.findOne({ email });

        if (user && await user.isPasswordValid(password)) {
            return user.email;
        } else {
            return null;
        }
    }

}

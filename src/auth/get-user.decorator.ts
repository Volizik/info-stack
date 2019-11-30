import {createParamDecorator} from '@nestjs/common';
import {User} from '../users/users.entity';

export const GetUser = createParamDecorator((data, req): User => req.user);

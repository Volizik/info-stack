import {EntityRepository, Repository} from 'typeorm';
import {User} from './users.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async findByEmail(email: string): Promise<User> {
        return this.findOne({where: {email}});
    }
}

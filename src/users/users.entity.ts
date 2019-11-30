import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, OneToMany} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Worker} from '../workers/workers.entity';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Worker, worker => worker.creator, { eager: false })
    workers: Worker[];

    async isPasswordValid(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}

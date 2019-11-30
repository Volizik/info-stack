import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne} from 'typeorm';
import {User} from '../users/users.entity';

@Entity('workers')
export class Worker extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({ nullable: true })
    age?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    photo?: string;

    @Column()
    description: string;

    @ManyToOne(type => User, user => user.workers, { eager: true })
    creator: User;

    @Column()
    creatorId: number;

}

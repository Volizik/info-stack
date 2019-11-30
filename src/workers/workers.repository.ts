import {EntityRepository, Repository} from 'typeorm';
import {Worker} from './workers.entity';
import {GetWorkersFilterDto} from './dto/get-workers-filter.dto';
import {NotFoundException} from '@nestjs/common';
import {CreateWorkerDto} from './dto/create-worker.dto';
import {User} from '../users/users.entity';

@EntityRepository(Worker)
export class WorkersRepository extends Repository<Worker> {

    async getWorkers(filterDto: GetWorkersFilterDto): Promise<Worker[]> {
        const { limit, offset } = filterDto;

        return await this.find({skip: offset, take: limit});
    }

    async getWorkerById(id: number): Promise<Worker> {
        const worker = await this.findOne({where: {id}});

        if (!worker) {
            throw new NotFoundException()
        } else {
            return worker;
        }
    }

    async createWorker(createWorkerDto: CreateWorkerDto, user: User): Promise<Worker> {
        const {name, surname, age, description, email, phone, photo} = createWorkerDto;
        const worker = new Worker();

        console.log(createWorkerDto)

        worker.name = name;
        worker.surname = surname;
        worker.age = age;
        worker.description = description;
        worker.email = email;
        worker.phone = phone;
        worker.photo = photo;
        worker.creator = user;


        await worker.save();
        delete worker.creator;

        return worker;
    }

}

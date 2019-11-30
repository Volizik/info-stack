import { Injectable } from '@nestjs/common';
import {GetWorkersFilterDto} from './dto/get-workers-filter.dto';
import {Worker} from './workers.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {WorkersRepository} from './workers.repository';
import {CreateWorkerDto} from './dto/create-worker.dto';
import {User} from '../users/users.entity';

@Injectable()
export class WorkersService {

    constructor(@InjectRepository(WorkersRepository) private workersRepository: WorkersRepository) {}

    getWorkers(filterDto: GetWorkersFilterDto): Promise<Worker[]> {
        return this.workersRepository.getWorkers(filterDto);
    }

    getWorkerById(id: number): Promise<Worker> {
        return this.workersRepository.getWorkerById(id);
    }

    createWorker(createWorkerDto: CreateWorkerDto, user: User): Promise<Worker> {
        return this.workersRepository.createWorker(createWorkerDto, user);
    }

}

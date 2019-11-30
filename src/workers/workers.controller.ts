import {Body, Controller, Delete, Get, Logger, Param, Post, Query, UseGuards, ValidationPipe} from '@nestjs/common';
import {GetUser} from '../auth/get-user.decorator';
import {User} from '../users/users.entity';
import {AuthGuard} from '@nestjs/passport';
import {GetWorkersFilterDto} from './dto/get-workers-filter.dto';
import {WorkersService} from './workers.service';
import {Worker} from './workers.entity';
import {CreateWorkerDto} from './dto/create-worker.dto';

@Controller('workers')
export class WorkersController {

    private readonly logger = new Logger('WorkersController');

    constructor(private workersService: WorkersService) {}

    @Get()
    getWorkers(@Query(ValidationPipe) filterDto: GetWorkersFilterDto): Promise<Worker[]> {
        return this.workersService.getWorkers(filterDto);
    }

    @Get('/:id')
    getWorkerById(@Param('id') id: number): Promise<Worker> {
        return this.workersService.getWorkerById(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    createWorker(
        @GetUser() user: User,
        @Body(ValidationPipe) createWorkerDto: CreateWorkerDto,
    ): Promise<Worker> {
        this.logger.log(user);
        return this.workersService.createWorker(createWorkerDto, user);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    deleteWorkerById(@GetUser() user: User) {
        this.logger.log(user)
    }

}

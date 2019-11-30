import {IsNotEmpty} from 'class-validator';

export class GetWorkersFilterDto {

    @IsNotEmpty()
    offset: number;

    @IsNotEmpty()
    limit: number;

}

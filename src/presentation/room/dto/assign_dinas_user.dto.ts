import { IsNumber } from 'class-validator';

export class AssignDinasUserDto {
    @IsNumber()
    user_id!: number;
}

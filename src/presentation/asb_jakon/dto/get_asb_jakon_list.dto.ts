import { IsNumber, Min, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAsbJakonListDto {
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => Number(value))
    page!: number;

    @IsNumber()
    @Min(1)
    @Transform(({ value }) => Number(value))
    amount!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    room_id?: number;
}

import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAsbKomponenBangunanProsNonstdListDto {
    @IsNumber()
    @IsNotEmpty()
    page!: number;

    @IsNumber()
    @IsNotEmpty()
    amount!: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    room_id?: number;
}

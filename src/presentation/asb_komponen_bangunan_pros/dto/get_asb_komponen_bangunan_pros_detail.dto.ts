import { IsNumber } from 'class-validator';

export class GetAsbKomponenBangunanProsDetailDto {
    @IsNumber()
    id!: number;
}

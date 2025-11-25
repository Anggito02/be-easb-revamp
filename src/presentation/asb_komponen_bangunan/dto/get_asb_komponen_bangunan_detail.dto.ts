import { IsNumber } from 'class-validator';

export class GetAsbKomponenBangunanDetailDto {
    @IsNumber()
    id!: number;
}

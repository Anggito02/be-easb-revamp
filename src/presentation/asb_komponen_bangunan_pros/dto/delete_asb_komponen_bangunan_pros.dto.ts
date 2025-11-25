import { IsNumber } from 'class-validator';

export class DeleteAsbKomponenBangunanProsDto {
    @IsNumber()
    id!: number;
}

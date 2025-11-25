import { IsNumber } from 'class-validator';

export class DeleteAsbKomponenBangunanDto {
    @IsNumber()
    id!: number;
}

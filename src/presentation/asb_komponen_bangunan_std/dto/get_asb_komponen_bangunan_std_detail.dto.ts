import { IsNumber } from 'class-validator';

export class GetAsbKomponenBangunanStdDetailDto {
    @IsNumber()
    id!: number;
}

import { IsNumber } from 'class-validator';

export class GetAsbKomponenBangunanNonstdDetailDto {
    @IsNumber()
    id!: number;
}

import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAsbKomponenBangunanNonstdDto {
    @IsString()
    @IsNotEmpty()
    komponen!: string;

    @IsNumber()
    @IsNotEmpty()
    bobotMin!: number;

    @IsNumber()
    @IsNotEmpty()
    bobot!: number;

    @IsNumber()
    @IsNotEmpty()
    bobotMax!: number;
}

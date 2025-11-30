import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAsbKomponenBangunanProsStdDto {
    @IsNumber()
    @IsNotEmpty()
    idAsbKomponenBangunan!: number;

    @IsNumber()
    @IsNotEmpty()
    idAsbTipeBangunanStd!: number;

    @IsNumber()
    @IsNotEmpty()
    min!: number;

    @IsNumber()
    @IsOptional()
    avgMin?: number;

    @IsNumber()
    @IsNotEmpty()
    avg!: number;

    @IsNumber()
    @IsOptional()
    avgMax?: number;

    @IsNumber()
    @IsNotEmpty()
    max!: number;
}

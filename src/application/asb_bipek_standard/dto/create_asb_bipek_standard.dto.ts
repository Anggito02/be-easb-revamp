import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Files } from '../../../domain/asb_detail/files.enum';
import { CalculationMethod } from '../../../domain/asb_bipek_standard/calculation_method.enum';

export class CreateAsbBipekStandardDto {
    @IsEnum(Files)
    @IsOptional()
    files: Files;

    @IsInt()
    @IsOptional()
    idAsbKomponenBangunan: number;

    @IsNumber()
    @IsOptional()
    bobotInput: number;

    @IsNumber()
    @IsOptional()
    bobotInputProsentase: number;

    @IsEnum(CalculationMethod)
    @IsOptional()
    calculationMethod: CalculationMethod;

    @IsNumber()
    @IsOptional()
    jumlahBobot: number;

    @IsNumber()
    @IsOptional()
    rincianHarga: number;
}

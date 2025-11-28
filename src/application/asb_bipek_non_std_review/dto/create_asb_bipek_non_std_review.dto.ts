import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Files } from '../../../domain/asb_detail/files.enum';

export class CreateAsbBipekNonStdReviewDto {
    @IsInt()
    idAsbBipekNonStd: number;

    @IsInt()
    idAsbKomponenBangunan: number;

    @IsEnum(Files)
    @IsOptional()
    files: Files;

    @IsNumber()
    bobotInput: number;

    @IsNumber()
    jumlahBobot: number;

    @IsNumber()
    rincianHarga: number;
}

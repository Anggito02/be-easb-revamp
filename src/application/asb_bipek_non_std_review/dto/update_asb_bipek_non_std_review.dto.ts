import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Files } from '../../../domain/asb_detail/files.enum';

export class UpdateAsbBipekNonStdReviewDto {
    @IsInt()
    id: number;

    @IsInt()
    @IsOptional()
    idAsbBipekNonStd?: number;

    @IsInt()
    @IsOptional()
    idAsbKomponenBangunan?: number | null;

    @IsEnum(Files)
    @IsOptional()
    files?: Files;

    @IsNumber()
    @IsOptional()
    bobotInput?: number | null;

    @IsNumber()
    @IsOptional()
    jumlahBobot?: number | null;

    @IsNumber()
    @IsOptional()
    rincianHarga?: number | null;
}

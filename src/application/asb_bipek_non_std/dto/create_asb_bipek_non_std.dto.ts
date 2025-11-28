import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Files } from '../../../domain/asb_detail/files.enum';

export class CreateAsbBipekNonStdDto {
    @IsEnum(Files)
    @IsOptional()
    files: Files;

    @IsInt()
    idAsbKomponenBangunan: number;

    @IsNumber()
    bobotInput: number;

    @IsNumber()
    jumlahBobot: number;

    @IsNumber()
    rincianHarga: number;
}

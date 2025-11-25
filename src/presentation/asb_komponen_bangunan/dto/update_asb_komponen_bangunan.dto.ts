import { IsNumber, IsString, IsOptional, IsEnum } from 'class-validator';
import { AsbKomponenBangunanFiles } from '../../../domain/asb_komponen_bangunan/asb_komponen_bangunan_files.enum';

export class UpdateAsbKomponenBangunanDto {
    @IsNumber()
    id!: number;

    @IsString()
    @IsOptional()
    komponen?: string;

    @IsEnum(AsbKomponenBangunanFiles)
    @IsOptional()
    files?: AsbKomponenBangunanFiles;

    @IsNumber()
    @IsOptional()
    idAsbJenis?: number;
}

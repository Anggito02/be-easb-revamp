import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { AsbKomponenBangunanFiles } from '../../../domain/asb_komponen_bangunan/asb_komponen_bangunan_files.enum';

export class CreateAsbKomponenBangunanDto {
    @IsString()
    @IsNotEmpty()
    komponen!: string;

    @IsEnum(AsbKomponenBangunanFiles)
    @IsNotEmpty()
    files!: AsbKomponenBangunanFiles;

    @IsNumber()
    @IsNotEmpty()
    idAsbJenis!: number;
}

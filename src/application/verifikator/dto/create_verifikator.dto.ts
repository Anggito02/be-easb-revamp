import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { JenisVerifikator } from '../../../domain/verifikator/jenis_verifikator.enum';

export class CreateVerifikatorDto {
    @IsNumber()
    @IsNotEmpty()
    idUser!: number;

    @IsEnum(JenisVerifikator)
    @IsNotEmpty()
    jenisVerifikator!: JenisVerifikator;

    @IsString()
    @IsNotEmpty()
    verifikator!: string;

    @IsOptional()
    @IsNumber()
    room_id?: number;
}

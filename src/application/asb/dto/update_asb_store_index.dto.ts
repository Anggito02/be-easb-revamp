import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateAsbStoreIndexDto {
    @IsInt()
    @IsNotEmpty()
    id: number;

    @IsInt()
    @IsNotEmpty()
    tahunAnggaran: number;

    @IsString()
    @IsNotEmpty()
    namaAsb: string;

    @IsString()
    @IsNotEmpty()
    alamat: string;

    @IsInt()
    @IsNotEmpty()
    totalLantai: number;

    @IsInt()
    @IsNotEmpty()
    idAsbTipeBangunan: number;

    @IsInt()
    @IsNotEmpty()
    idAsbKlasifikasi: number;

    @IsInt()
    @IsNotEmpty()
    idKabkota: number;

    @IsInt()
    @IsNotEmpty()
    jumlahKontraktor: number;

    // Internal use
    @IsInt()
    @IsOptional()
    idAsbStatus?: number;
}

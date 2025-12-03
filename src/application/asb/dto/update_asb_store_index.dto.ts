import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateAsbStoreIndexDto {
    @IsInt()
    @IsNotEmpty()
    id: number;

    @IsInt()
    @IsNotEmpty()
    tahun_anggaran: number;

    @IsString()
    @IsNotEmpty()
    nama_asb: string;

    @IsString()
    @IsNotEmpty()
    alamat: string;

    @IsInt()
    @IsNotEmpty()
    total_lantai: number;

    @IsInt()
    @IsNotEmpty()
    id_asb_tipe_bangunan: number;

    @IsInt()
    @IsNotEmpty()
    id_klasifikasi: number;

    @IsInt()
    @IsNotEmpty()
    id_kabkota: number;

    @IsInt()
    @IsNotEmpty()
    jumlah_kontraktor: number;

    // Internal use
    idAsbStatus?: number;
}

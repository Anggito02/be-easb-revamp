import { IsNumber, IsOptional } from 'class-validator';

export class UpdateAsbBpsGalleryDto {
    @IsNumber()
    id: number;

    @IsOptional()
    @IsNumber()
    idAsbKomponenBangunan?: number;

    // File is optional for update, handled via @UploadedFile() decorator

    @IsOptional()
    @IsNumber()
    jumlahBobot?: number;

    @IsOptional()
    @IsNumber()
    rincianHarga?: number;
}

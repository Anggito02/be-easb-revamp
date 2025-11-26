import { IsOptional, IsNumber } from 'class-validator';

export class CreateAsbBpsGalleryDto {
    @IsOptional()
    @IsNumber()
    idAsbKomponenBangunan?: number;

    // File is handled via @UploadedFile() decorator in controller

    @IsOptional()
    @IsNumber()
    jumlahBobot?: number;

    @IsOptional()
    @IsNumber()
    rincianHarga?: number;
}

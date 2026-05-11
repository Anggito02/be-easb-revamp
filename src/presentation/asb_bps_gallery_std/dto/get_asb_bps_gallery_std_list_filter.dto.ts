import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAsbBpsGalleryStdListFilterDto {
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    idAsbKomponenBangunanStd?: number;

    @IsOptional()
    @IsString()
    filename?: string;

    @IsOptional()
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    jumlahBobot?: number;

    @IsOptional()
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    rincianHarga?: number;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    room_id?: number;
}

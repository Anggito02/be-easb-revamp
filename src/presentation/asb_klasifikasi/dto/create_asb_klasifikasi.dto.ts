import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAsbKlasifikasiDto {
  @IsNumber()
  @IsNotEmpty()
  id_asb_tipe_bangunan!: number;

  @IsString()
  @IsNotEmpty()
  klasifikasi!: string;

  @IsOptional()
  @IsNumber()
  room_id?: number;
}

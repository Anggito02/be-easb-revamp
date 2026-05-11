import { IsString, IsNumber, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAsbFungsiRuangDto {
  @IsString()
  @IsNotEmpty()
  nama_fungsi_ruang!: string;

  @IsNumber()
  @IsNotEmpty()
  koef!: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive!: boolean;

  @IsOptional()
  @IsNumber()
  room_id?: number;
}

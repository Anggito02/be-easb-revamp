import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateRekeningDto {
  @IsString()
  @IsNotEmpty()
  rekening_kode!: string;

  @IsString()
  @IsNotEmpty()
  rekening_uraian!: string;

  @IsOptional()
  @IsNumber()
  room_id?: number;
}

import { IsOptional, IsNumber } from 'class-validator';

export class CreateAsbLantaiDto {
  lantai!: string;
  type!: string;
  koef!: number;
  id_satuan!: number;

  @IsOptional()
  @IsNumber()
  room_id?: number;
}

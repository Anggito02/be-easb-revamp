import { IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetRekeningsDto {
  @IsNumber()
      @Min(1)
      @Transform(({ value }) => parseInt(value, 10))
      page!: number;

      @IsNumber()
      @Min(1)
      @Transform(({ value }) => parseInt(value, 10))
      amount!: number;

      @IsOptional()
      @IsNumber()
      @Transform(({ value }) => parseInt(value, 10))
      room_id?: number;

      /** Accepted for API compatibility; not used in filtering (no DB column). */
      @IsOptional()
      @IsNumber()
      @Transform(({ value }) => parseInt(value, 10))
      id_jenis_usulan?: number;
}

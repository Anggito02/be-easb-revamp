import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateJenisStandarDto {
  @IsString()
  @IsNotEmpty()
  jenis!: string;

  @IsOptional()
  @IsNumber()
  room_id?: number;
}

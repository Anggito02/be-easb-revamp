import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateAsbStatusDto {
  @IsString()
  @IsNotEmpty()
  status!: string;

  @IsOptional()
  @IsNumber()
  room_id?: number;
}

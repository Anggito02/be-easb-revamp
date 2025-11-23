import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateAsbTipeBangunanDto {
  @IsString()
  @IsNotEmpty()
  tipe_bangunan!: string;

  @IsNumber()
  @IsNotEmpty()
  id_asb_jenis!: number;
}

import { IsNumber, IsNotEmpty } from "class-validator";

export class GetAsbTipeBangunanByAsbJenisDto {
  @IsNumber()
  @IsNotEmpty()
  asbJenisId!: number;
}

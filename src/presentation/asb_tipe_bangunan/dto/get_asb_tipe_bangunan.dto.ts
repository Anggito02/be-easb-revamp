import { IsNumber, IsNotEmpty, Min } from "class-validator";

export class GetAsbTipeBangunanDto {
  @IsNumber()
  @Min(1)
  page!: number;

  @IsNumber()
  @Min(1)
  amount!: number;
}

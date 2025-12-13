import { Transform } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class GetJalanSpesifikasiDesainKakuDto {
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    page!: number;

    @IsNumber()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    amount!: number;
}

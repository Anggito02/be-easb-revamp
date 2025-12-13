import { IsNotEmpty, IsNumber } from "class-validator";

export class GetJalanSpesifikasiDesainKakuDetailDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;
}

import { IsNotEmpty, IsNumber } from "class-validator";

export class GetJalanSpesifikasiDesainLenturDetailDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;
}

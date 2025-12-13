import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteJalanSpesifikasiDesainKakuDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;
}

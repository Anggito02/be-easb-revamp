import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteJalanSpesifikasiDesainLenturDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;
}

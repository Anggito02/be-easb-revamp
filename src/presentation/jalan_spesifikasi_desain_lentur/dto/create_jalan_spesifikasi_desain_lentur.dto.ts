import { IsNotEmpty, IsString } from "class-validator";

export class CreateJalanSpesifikasiDesainLenturDto {
    @IsNotEmpty()
    @IsString()
    spec!: string;

    @IsNotEmpty()
    @IsString()
    desc!: string;
}

import { IsNotEmpty, IsString } from "class-validator";

export class CreateJalanSpesifikasiDesainKakuDto {
    @IsNotEmpty()
    @IsString()
    spec!: string;

    @IsNotEmpty()
    @IsString()
    desc!: string;
}

import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateJalanSpesifikasiDesainKakuDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;

    @IsOptional()
    @IsString()
    spec?: string;
    
    @IsOptional()
    @IsString()
    desc?: string;
}

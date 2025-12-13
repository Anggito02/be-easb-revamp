import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateJalanMutuBetonDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;

    @IsOptional()
    @IsString()
    jenis?: string;
}

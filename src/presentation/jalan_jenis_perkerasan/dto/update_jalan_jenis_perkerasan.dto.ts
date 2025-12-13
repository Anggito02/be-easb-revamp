import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateJalanJenisPerkerasanDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;

    @IsOptional()
    @IsString()
    jenis?: string;
}

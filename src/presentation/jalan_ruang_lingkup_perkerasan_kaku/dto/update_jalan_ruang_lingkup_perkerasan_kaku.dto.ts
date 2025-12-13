import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateJalanRuangLingkupPerkerasanKakuDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;

    @IsOptional()
    @IsString()
    jenis?: string;
}

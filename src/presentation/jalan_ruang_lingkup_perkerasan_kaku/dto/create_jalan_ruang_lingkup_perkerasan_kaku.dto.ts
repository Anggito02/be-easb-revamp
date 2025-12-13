import { IsNotEmpty, IsString } from "class-validator";

export class CreateJalanRuangLingkupPerkerasanKakuDto {
    @IsNotEmpty()
    @IsString()
    jenis!: string;
}

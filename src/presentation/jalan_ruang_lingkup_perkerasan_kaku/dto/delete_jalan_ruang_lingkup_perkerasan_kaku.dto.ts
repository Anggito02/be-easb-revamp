import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteJalanRuangLingkupPerkerasanKakuDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;
}

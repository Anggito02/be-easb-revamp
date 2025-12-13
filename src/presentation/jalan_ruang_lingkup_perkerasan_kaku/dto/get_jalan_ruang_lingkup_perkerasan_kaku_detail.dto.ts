import { IsNotEmpty, IsNumber } from "class-validator";

export class GetJalanRuangLingkupPerkerasanKakuDetailDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;
}

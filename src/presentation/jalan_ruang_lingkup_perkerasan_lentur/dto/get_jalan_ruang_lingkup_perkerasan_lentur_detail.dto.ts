import { IsNotEmpty, IsNumber } from "class-validator";

export class GetJalanRuangLingkupPerkerasanLenturDetailDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;
}

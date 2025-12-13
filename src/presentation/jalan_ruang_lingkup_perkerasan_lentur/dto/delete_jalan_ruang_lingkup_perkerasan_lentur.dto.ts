import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteJalanRuangLingkupPerkerasanLenturDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;
}

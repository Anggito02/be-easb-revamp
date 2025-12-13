import { IsNotEmpty, IsString } from "class-validator";

export class CreateJalanRuangLingkupPerkerasanLenturDto {
    @IsNotEmpty()
    @IsString()
    jenis!: string;
}

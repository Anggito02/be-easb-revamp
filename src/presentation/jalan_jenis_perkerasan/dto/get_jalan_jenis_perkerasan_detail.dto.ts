import { IsNotEmpty, IsNumber } from "class-validator";

export class GetJalanJenisPerkerasanDetailDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;
}

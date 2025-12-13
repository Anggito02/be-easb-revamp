import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteJalanJenisPerkerasanDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;
}

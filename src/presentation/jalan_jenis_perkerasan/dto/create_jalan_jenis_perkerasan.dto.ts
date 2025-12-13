import { IsNotEmpty, IsString } from "class-validator";

export class CreateJalanJenisPerkerasanDto {
    @IsNotEmpty()
    @IsString()
    jenis!: string;
}

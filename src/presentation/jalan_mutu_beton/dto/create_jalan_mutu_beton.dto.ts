import { IsNotEmpty, IsString } from "class-validator";

export class CreateJalanMutuBetonDto {
    @IsNotEmpty()
    @IsString()
    jenis!: string;
}

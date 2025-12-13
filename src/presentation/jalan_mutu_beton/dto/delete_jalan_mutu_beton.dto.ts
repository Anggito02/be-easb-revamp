import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteJalanMutuBetonDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;
}

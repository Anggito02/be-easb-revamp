import { IsNotEmpty, IsNumber } from "class-validator";

export class GetJalanMutuBetonDetailDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number;
}
